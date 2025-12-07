export type CategoryWithCount = {
  _count: {
    products: number
  }
  icon: string | null
  id: string
  name: string
  order: number
  slug: string
}
