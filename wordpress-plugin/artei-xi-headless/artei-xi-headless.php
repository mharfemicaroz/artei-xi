<?php
/**
 * Plugin Name: ARTEI XI Headless Content
 * Description: Provides structured leadership and update content to the ARTEI XI Nuxt website.
 * Version: 1.0.0
 * Requires at least: 6.4
 * Requires PHP: 8.0
 * Text Domain: artei-xi-headless
 */

if (!defined('ABSPATH')) {
    exit;
}

function artei_xi_register_post_types(): void {
    register_post_type('artei_officer', [
        'labels' => [
            'name'          => __('Leadership', 'artei-xi-headless'),
            'singular_name' => __('Officer', 'artei-xi-headless'),
            'add_new_item'  => __('Add officer', 'artei-xi-headless'),
            'edit_item'     => __('Edit officer', 'artei-xi-headless'),
        ],
        'public'       => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-groups',
        'supports'     => ['title', 'thumbnail', 'page-attributes'],
    ]);

    register_post_type('artei_update', [
        'labels' => [
            'name'          => __('ARTEI Updates', 'artei-xi-headless'),
            'singular_name' => __('Update', 'artei-xi-headless'),
            'add_new_item'  => __('Add update', 'artei-xi-headless'),
            'edit_item'     => __('Edit update', 'artei-xi-headless'),
        ],
        'public'       => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-megaphone',
        'supports'     => ['title', 'editor', 'excerpt', 'thumbnail'],
    ]);
}
add_action('init', 'artei_xi_register_post_types');

function artei_xi_register_meta(): void {
    register_post_meta('artei_officer', 'artei_role', [
        'type'              => 'string',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback'     => static fn() => current_user_can('edit_posts'),
    ]);
    register_post_meta('artei_officer', 'artei_featured', [
        'type'          => 'boolean',
        'single'        => true,
        'show_in_rest'  => true,
        'auth_callback' => static fn() => current_user_can('edit_posts'),
    ]);
    register_post_meta('artei_update', 'artei_category', [
        'type'              => 'string',
        'single'            => true,
        'show_in_rest'      => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback'     => static fn() => current_user_can('edit_posts'),
    ]);
}
add_action('init', 'artei_xi_register_meta');

function artei_xi_image_payload(int $post_id): array {
    $image_id = get_post_thumbnail_id($post_id);
    if (!$image_id) return ['url' => '', 'alt' => ''];
    return [
        'url' => (string) (
            wp_get_attachment_image_url($image_id, 'large')
            ?: wp_get_attachment_image_url($image_id, 'full')
        ),
        'alt' => (string) get_post_meta($image_id, '_wp_attachment_image_alt', true),
    ];
}

function artei_xi_site_endpoint(): array {
    $officer_posts = get_posts([
        'post_type'      => 'artei_officer',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'orderby'        => ['menu_order' => 'ASC', 'title' => 'ASC'],
    ]);
    $update_posts = get_posts([
        'post_type'      => 'artei_update',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);

    $payload = [];
    if ($officer_posts) {
        $payload['officers'] = array_map(static function (WP_Post $post): array {
            $image = artei_xi_image_payload($post->ID);
            return [
                'name'      => get_the_title($post),
                'role'      => (string) get_post_meta($post->ID, 'artei_role', true),
                'image'     => $image['url'],
                'imageAlt'  => $image['alt'] ?: sprintf(__('Portrait of %s', 'artei-xi-headless'), get_the_title($post)),
                'featured'  => (bool) get_post_meta($post->ID, 'artei_featured', true),
            ];
        }, $officer_posts);
    }
    if ($update_posts) {
        $payload['updates'] = array_map(static function (WP_Post $post): array {
            $image = artei_xi_image_payload($post->ID);
            return [
                'date'      => get_the_date('Y-m-d', $post),
                'dateLabel' => get_the_date('F j, Y', $post),
                'category'  => (string) (get_post_meta($post->ID, 'artei_category', true) ?: __('Association', 'artei-xi-headless')),
                'title'     => get_the_title($post),
                'excerpt'   => wp_strip_all_tags(get_the_excerpt($post)),
                'image'     => $image['url'],
                'imageAlt'  => $image['alt'],
                'href'      => get_permalink($post),
            ];
        }, $update_posts);
    }
    return $payload;
}

add_action('rest_api_init', static function (): void {
    register_rest_route('artei/v1', '/site', [
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'artei_xi_site_endpoint',
        'permission_callback' => '__return_true',
    ]);
});

function artei_xi_add_meta_boxes(): void {
    add_meta_box('artei-officer-details', __('Officer details', 'artei-xi-headless'), 'artei_xi_officer_meta_box', 'artei_officer', 'side');
    add_meta_box('artei-update-details', __('Update details', 'artei-xi-headless'), 'artei_xi_update_meta_box', 'artei_update', 'side');
}
add_action('add_meta_boxes', 'artei_xi_add_meta_boxes');

function artei_xi_officer_meta_box(WP_Post $post): void {
    wp_nonce_field('artei_xi_save_meta', 'artei_xi_nonce');
    $role = get_post_meta($post->ID, 'artei_role', true);
    $featured = (bool) get_post_meta($post->ID, 'artei_featured', true);
    echo '<p><label for="artei_role"><strong>' . esc_html__('Role', 'artei-xi-headless') . '</strong></label></p>';
    echo '<input class="widefat" id="artei_role" name="artei_role" value="' . esc_attr($role) . '">';
    echo '<p><label><input type="checkbox" name="artei_featured" value="1" ' . checked($featured, true, false) . '> ' . esc_html__('Feature this officer', 'artei-xi-headless') . '</label></p>';
}

function artei_xi_update_meta_box(WP_Post $post): void {
    wp_nonce_field('artei_xi_save_meta', 'artei_xi_nonce');
    $category = get_post_meta($post->ID, 'artei_category', true);
    echo '<p><label for="artei_category"><strong>' . esc_html__('Category label', 'artei-xi-headless') . '</strong></label></p>';
    echo '<input class="widefat" id="artei_category" name="artei_category" value="' . esc_attr($category) . '" placeholder="Association">';
}

function artei_xi_save_meta(int $post_id): void {
    if (!isset($_POST['artei_xi_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['artei_xi_nonce'])), 'artei_xi_save_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    if (get_post_type($post_id) === 'artei_officer') {
        update_post_meta($post_id, 'artei_role', sanitize_text_field(wp_unslash($_POST['artei_role'] ?? '')));
        update_post_meta($post_id, 'artei_featured', isset($_POST['artei_featured']));
    }
    if (get_post_type($post_id) === 'artei_update') {
        update_post_meta($post_id, 'artei_category', sanitize_text_field(wp_unslash($_POST['artei_category'] ?? '')));
    }
}
add_action('save_post', 'artei_xi_save_meta');
