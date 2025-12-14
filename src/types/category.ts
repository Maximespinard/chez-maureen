export type CategoryWithCount = {
  _count: {
    products: number
  }
  id: string
  name: string
  order: number
  slug: string
}
