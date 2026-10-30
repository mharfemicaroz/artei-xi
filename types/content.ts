export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface Organization {
  shortName: string
  fullName: string
  region: string
  facebookUrl: string
  email?: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  text: string
  image: string
}

export interface AboutContent {
  title: string
  lede: string
  body: string
  image: string
  imageAlt: string
  caption: string
}

export interface Commitment {
  number: string
  title: string
  text: string
  icon: string
}

export interface Officer {
  name: string
  role: string
  image: string
  imageAlt: string
  featured?: boolean
}

export interface UpdateItem {
  date: string
  dateLabel: string
  category: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
  href?: string
}

export interface MembershipContent {
  eyebrow: string
  title: string
  text: string
  note: string
  image: string
}

export interface SiteContent {
  seo: { title: string; description: string }
  organization: Organization
  navigation: NavigationItem[]
  hero: HeroContent
  about: AboutContent
  commitments: Commitment[]
  officers: Officer[]
  adviser: Officer
  updates: UpdateItem[]
  membership: MembershipContent
}
