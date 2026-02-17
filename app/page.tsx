const milestoneChecklist = [
  "Repo bootstrap",
  "Auth + Workspace + RBAC",
  "Clients + Contacts",
  "Projects + Tasks",
  "Time + Approvals",
  "Invoicing + Payments",
  "Reports",
  "Audit hardening + Mercury adapter",
];

export default function Home() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Agency CRM / ERP</h1>
        <p className="text-sm text-slate-600">
          Bootstrap complete. Start building vertical slices in strict order.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-lg font-medium">Milestone Plan</h2>
        <ol className="space-y-2 text-sm">
          {milestoneChecklist.map((item, index) => (
            <li key={item} className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
