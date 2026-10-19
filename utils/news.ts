import type { UpdateItem } from '~/types/content'

export function newsSlug(update: Pick<UpdateItem, 'title'>): string {
  return update.title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function newsPath(update: Pick<UpdateItem, 'title'>): string {
  return `/news/${newsSlug(update)}`
}
