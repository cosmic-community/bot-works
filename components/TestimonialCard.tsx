import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const photo = testimonial.metadata?.photo;
  const rating = testimonial.metadata?.rating ?? 5;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <StarRating rating={rating} />
      <blockquote className="mt-4 text-gray-700 leading-relaxed flex-1 italic">
        &ldquo;{testimonial.metadata?.quote || 'Great experience!'}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-4 pt-4 border-t border-gray-100">
        {photo ? (
          <img
            src={`${photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
            alt={testimonial.metadata?.client_name || 'Client'}
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={48}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
            <span className="text-brand-600 text-lg font-bold">
              {(testimonial.metadata?.client_name || 'C')[0]}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            {testimonial.metadata?.client_name || 'Client'}
          </p>
          <p className="text-xs text-gray-500">
            {[testimonial.metadata?.client_title, testimonial.metadata?.company]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>
      </div>
    </div>
  );
}