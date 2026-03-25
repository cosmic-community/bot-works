import { getTeamMembers } from '@/lib/cosmic';
import TeamMemberCard from '@/components/TeamMemberCard';
import SectionHeading from '@/components/SectionHeading';
import TeamFilter from '@/components/TeamFilter';

export const metadata = {
  title: 'Team — Bot Works',
  description: 'Meet the humans and AI-powered team members behind Bot Works.',
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Team"
          title="The Humans & AI Behind Bot Works"
          description="A unique blend of human talent and AI-powered team members working together."
        />
        <TeamFilter members={teamMembers} />
      </div>
    </section>
  );
}