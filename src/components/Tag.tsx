export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-rule px-2.5 py-1 font-mono text-[11px] text-muted">
      {children}
    </li>
  );
}
