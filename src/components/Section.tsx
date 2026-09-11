type SectionProps = {
  id: string;
  label: string;
  children: React.ReactNode;
};

export function Section({ id, label, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-rule py-14 sm:py-20">
      <h2 className="mb-8 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
        {label}
      </h2>
      {children}
    </section>
  );
}
