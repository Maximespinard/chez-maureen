import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ArrowRight, Package } from 'lucide-react'

import type { ProductModel } from '@/lib/schema'
import { Button } from '@/components/ui/button'

interface RecentProductsProps {
  products: Array<ProductModel>
}

export function RecentProducts({ products }: RecentProductsProps) {
  return (
    <div className="border-border-subtle rounded-lg border bg-white shadow-sm">
      <div className="border-border-subtle border-b p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <Package className="size-5 text-blue-600" />
            </div>
            <h2 className="text-text-dark text-lg font-semibold">
              Produits récents
            </h2>
          </div>
          <Link to="/admin/produits">
            <Button variant="ghost" size="sm">
              Voir tout
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="divide-border-subtle divide-y">
        {products.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-text-light text-sm">
              Aucun produit pour le moment
            </p>
          </div>
        ) : (
          products.map((product) => (
            <Link
              key={product.id}
              to="/admin/produits/$id/modifier"
              params={{ id: product.id }}
              className="block p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-start gap-4">
                {/* Image */}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-lg bg-gray-100">
                    <Package className="size-6 text-gray-400" />
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-text-dark truncate text-sm font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-text-light mt-1 text-xs">
                    Ajouté le{' '}
                    {format(new Date(product.createdAt), 'd MMM yyyy', {
                      locale: fr,
                    })}
                  </p>
                </div>

                {/* Price */}
                <div className="text-text-dark text-right text-sm font-semibold">
                  {product.price.toFixed(2)} €
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
