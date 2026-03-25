import { getServices } from '@/lib/cosmic';
import ServiceCard from '@/components/ServiceCard';
import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'Services — Bot Works',
  description: 'Explore the full range of digital services and AI-powered solutions offered by Bot Works.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Services"
          title="What We Offer"
          description="End-to-end digital services designed to meet the unique needs of diverse clientele."
        />
        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services found. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}