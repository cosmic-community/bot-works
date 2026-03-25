import Link from 'next/link';
import { getServices, getTeamMembers, getCaseStudies, getTestimonials } from '@/lib/cosmic';
import ServiceCard from '@/components/ServiceCard';
import TeamMemberCard from '@/components/TeamMemberCard';
import CaseStudyCard from '@/components/CaseStudyCard';
import TestimonialCard from '@/components/TestimonialCard';
import SectionHeading from '@/components/SectionHeading';

export default async function HomePage() {
  const [services, teamMembers, caseStudies, testimonials] = await Promise.all([
    getServices(),
    getTeamMembers(),
    getCaseStudies(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-brand-950 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-400 rounded-full blur-[128px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-36 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-brand-300 text-sm font-medium rounded-full backdrop-blur-sm border border-white/10 mb-6">
            🤖 Human Expertise + AI Power
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
            Digital Solutions<br />
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
              Built Smarter
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Bot Works combines human expertise with AI-powered team members to deliver
            tailored end-to-end project management and digital services across industries.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/services"
              className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-brand-500/25"
            >
              Our Services
            </Link>
            <Link
              href="/case-studies"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/10 transition-colors"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What We Do"
            title="Our Services"
            description="End-to-end digital services tailored to your unique needs."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          {services.length > 6 && (
            <div className="mt-12 text-center">
              <Link href="/services" className="text-brand-600 hover:text-brand-700 font-semibold text-sm">
                View all services →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Team"
            title="Meet the Crew"
            description="A unique blend of human talent and AI-powered team members."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.slice(0, 4).map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
          {teamMembers.length > 4 && (
            <div className="mt-12 text-center">
              <Link href="/team" className="text-brand-600 hover:text-brand-700 font-semibold text-sm">
                Meet the full team →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-24 bg-gray-50/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Our Work"
              title="Case Studies"
              description="Real results for real clients. See what we've accomplished."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.slice(0, 3).map((cs) => (
                <CaseStudyCard key={cs.id} caseStudy={cs} />
              ))}
            </div>
            {caseStudies.length > 3 && (
              <div className="mt-12 text-center">
                <Link href="/case-studies" className="text-brand-600 hover:text-brand-700 font-semibold text-sm">
                  View all case studies →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Client Feedback"
              title="What Our Clients Say"
              description="Don't just take our word for it — hear from our clients."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
            {testimonials.length > 3 && (
              <div className="mt-12 text-center">
                <Link href="/testimonials" className="text-brand-600 hover:text-brand-700 font-semibold text-sm">
                  Read all testimonials →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-lg text-brand-100 max-w-2xl mx-auto">
            Let our team of humans and AI work together to deliver the perfect solution for you.
          </p>
          <div className="mt-8">
            <Link
              href="/services"
              className="inline-block px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-lg"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}