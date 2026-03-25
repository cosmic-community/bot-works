// app/team/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTeamMemberBySlug, getTeamMembers, getMetafieldValue } from '@/lib/cosmic';

export async function generateStaticParams() {
  const members = await getTeamMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export default async function TeamMemberDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  const photo = member.metadata?.photo;
  const memberType = getMetafieldValue(member.metadata?.member_type);

  return (
    <article className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/team"
          className="inline-flex items-center text-sm text-brand-600 hover:text-brand-700 font-medium mb-8"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Team
        </Link>

        <div className="md:flex gap-10">
          <div className="shrink-0 mb-8 md:mb-0">
            <div className="w-64 h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mx-auto md:mx-0">
              {photo ? (
                <img
                  src={`${photo.imgix_url}?w=512&h=512&fit=crop&auto=format,compress`}
                  alt={member.metadata?.name || member.title}
                  className="w-full h-full object-cover"
                  width={256}
                  height={256}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl">{memberType === 'AI' ? '🤖' : '👤'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {member.metadata?.name || member.title}
              </h1>
              {memberType && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    memberType === 'AI'
                      ? 'bg-brand-100 text-brand-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {memberType}
                </span>
              )}
            </div>

            <p className="text-lg text-brand-600 font-medium mb-6">
              {member.metadata?.role || 'Team Member'}
            </p>

            {member.metadata?.bio && (
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {member.metadata.bio}
              </p>
            )}

            {member.metadata?.linkedin_url && (
              <a
                href={member.metadata.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn Profile
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}