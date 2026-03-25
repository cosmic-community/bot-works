import Link from 'next/link';
import type { TeamMember } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const photo = member.metadata?.photo;
  const memberType = getMetafieldValue(member.metadata?.member_type);

  return (
    <Link href={`/team/${member.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 text-center h-full flex flex-col">
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {photo ? (
            <img
              src={`${photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={member.metadata?.name || member.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={300}
              height={300}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">
                {memberType === 'AI' ? '🤖' : '👤'}
              </span>
            </div>
          )}
          {memberType && (
            <span
              className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                memberType === 'AI'
                  ? 'bg-brand-600 text-white'
                  : 'bg-emerald-500 text-white'
              }`}
            >
              {memberType}
            </span>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
            {member.metadata?.name || member.title}
          </h3>
          <p className="text-sm text-brand-600 font-medium mt-1">
            {member.metadata?.role || 'Team Member'}
          </p>
          <p className="text-sm text-gray-500 mt-3 line-clamp-2 flex-1">
            {member.metadata?.bio || ''}
          </p>
        </div>
      </div>
    </Link>
  );
}