import Link from 'next/link';
import type { CaseStudy } from '@/types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const image = caseStudy.metadata?.featured_image;

  return (
    <Link href={`/case-studies/${caseStudy.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 h-full flex flex-col">
        {image ? (
          <div className="relative h-52 overflow-hidden">
            <img
              src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={caseStudy.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={400}
              height={250}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        ) : (
          <div className="h-52 bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <span className="text-5xl">📊</span>
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            {caseStudy.metadata?.industry && (
              <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full">
                {caseStudy.metadata.industry}
              </span>
            )}
            {caseStudy.metadata?.client_name && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                {caseStudy.metadata.client_name}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {caseStudy.metadata?.summary || 'Read this case study to learn more.'}
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-medium text-brand-600 group-hover:text-brand-700">
            Read case study
            <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}