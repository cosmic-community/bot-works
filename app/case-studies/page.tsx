import { getCaseStudies } from '@/lib/cosmic';
import CaseStudyCard from '@/components/CaseStudyCard';
import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'Case Studies — Bot Works',
  description: 'Explore our portfolio of successful projects and client partnerships.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Work"
          title="Case Studies"
          description="Real results for real clients. Explore our portfolio of successful projects."
        />
        {caseStudies.length === 0 ? (
          <p className="text-center text-gray-500">No case studies found. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}