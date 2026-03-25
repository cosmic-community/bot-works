// app/case-studies/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCaseStudyBySlug, getCaseStudies, getMetafieldValue } from '@/lib/cosmic';
import type { Service, TeamMember } from '@/types';

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const image = caseStudy.metadata?.featured_image;
  const services = caseStudy.metadata?.services_used;
  const team = caseStudy.metadata?.team_members;

  return (
    <article className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/case-studies"
          className="inline-flex items-center text-sm text-brand-600 hover:text-brand-700 font-medium mb-8"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Case Studies
        </Link>

        {image && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={`${image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt={caseStudy.title}
              className="w-full h-64 sm:h-80 object-cover"
              width={800}
              height={300}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-4">
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

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{caseStudy.title}</h1>

        {caseStudy.metadata?.summary && (
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {caseStudy.metadata.summary}
          </p>
        )}

        {caseStudy.metadata?.content && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-brand-600 mb-12"
            dangerouslySetInnerHTML={{ __html: caseStudy.metadata.content }}
          />
        )}

        {/* Services Used */}
        {services && Array.isArray(services) && services.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Used</h2>
            <div className="flex flex-wrap gap-3">
              {services.map((service: Service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="px-4 py-2 bg-brand-50 text-brand-700 rounded-xl text-sm font-medium hover:bg-brand-100 transition-colors"
                >
                  {service.metadata?.icon && <span className="mr-1">{service.metadata.icon}</span>}
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Team Members */}
        {team && Array.isArray(team) && team.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Members</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {team.map((member: TeamMember) => {
                const photo = member.metadata?.photo;
                const memberType = getMetafieldValue(member.metadata?.member_type);

                return (
                  <Link
                    key={member.id}
                    href={`/team/${member.slug}`}
                    className="group text-center p-4 bg-gray-50 rounded-xl hover:bg-brand-50 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 bg-gray-200">
                      {photo ? (
                        <img
                          src={`${photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                          alt={member.metadata?.name || member.title}
                          className="w-full h-full object-cover"
                          width={64}
                          height={64}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl">{memberType === 'AI' ? '🤖' : '👤'}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                      {member.metadata?.name || member.title}
                    </p>
                    <p className="text-xs text-gray-500">{member.metadata?.role || ''}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}