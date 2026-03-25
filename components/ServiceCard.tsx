import Link from 'next/link';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const image = service.metadata?.featured_image;
  const icon = service.metadata?.icon;

  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 h-full flex flex-col">
        {image ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={400}
              height={200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-5xl">{icon || '🛠️'}</span>
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          {icon && image && <span className="text-2xl mb-2">{icon}</span>}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {service.metadata?.description || 'Learn more about this service.'}
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-medium text-brand-600 group-hover:text-brand-700">
            Learn more
            <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}