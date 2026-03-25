interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({ label, title, description, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {label && (
        <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-600 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}