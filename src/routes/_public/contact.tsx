import { createFileRoute } from '@tanstack/react-router'
import { ContactHeader } from '@/features/contact/components/ContactHeader'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { StoreInfo } from '@/features/contact/components/StoreInfo'
import { ContactCta } from '@/features/contact/components/ContactCta'

export const Route = createFileRoute('/_public/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <>
      <ContactHeader />

      {/* Contact Section */}
      <section className="from-primeur-warm-white to-primeur-cream relative overflow-hidden bg-linear-to-b py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            {/* Left: Contact Form */}
            <ContactForm />

            {/* Right: Store Info */}
            <StoreInfo />
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
