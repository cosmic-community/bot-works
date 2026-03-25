'use client';

import { useState, useMemo } from 'react';
import type { TeamMember } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import TeamMemberCard from '@/components/TeamMemberCard';

interface TeamFilterProps {
  members: TeamMember[];
}

export default function TeamFilter({ members }: TeamFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const memberTypes = useMemo(() => {
    const types = new Set<string>();
    types.add('All');
    members.forEach((m) => {
      const mt = getMetafieldValue(m.metadata?.member_type);
      if (mt) types.add(mt);
    });
    return Array.from(types);
  }, [members]);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return members;
    return members.filter((m) => {
      const mt = getMetafieldValue(m.metadata?.member_type);
      return mt === activeFilter;
    });
  }, [members, activeFilter]);

  return (
    <>
      {memberTypes.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {memberTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === type
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No team members found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </>
  );
}