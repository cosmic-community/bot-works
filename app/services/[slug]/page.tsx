// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getServices } from '@/lib/cosmic';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const image = service.metadata?.featured_image;
  const icon = service.metadata?.icon;

  return (
    <article className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center text-sm text-brand-600 hover:text-brand-700 font-medium mb-8"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Services
        </Link>

        {image && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={`${image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt={service.title}
              className="w-full h-64 sm:h-80 object-cover"
              width={800}
              height={300}
            />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          {icon && <span className="text-4xl">{icon}</span>}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{service.title}</h1>
        </div>

        {service.metadata?.description && (
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {service.metadata.description}
          </p>
        )}

        {service.metadata?.content && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-brand-600"
            dangerouslySetInnerHTML={{ __html: service.metadata.content }}
          />
        )}
      </div>
    </article>
  );
}