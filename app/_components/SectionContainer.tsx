export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
      {children}
    </div>
  );
}