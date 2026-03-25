import { getTestimonials } from '@/lib/cosmic';
import TestimonialCard from '@/components/TestimonialCard';
import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'Testimonials — Bot Works',
  description: 'Hear what our clients have to say about working with Bot Works.',
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Client Feedback"
          title="What Our Clients Say"
          description="Don't just take our word for it — hear from our valued clients."
        />
        {testimonials.length === 0 ? (
          <p className="text-center text-gray-500">No testimonials yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}