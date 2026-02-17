const roleCapabilities = [
  {
    role: "ADMIN",
    capabilities: "Full workspace administration, membership, integrations, and settings",
  },
  {
    role: "FINANCE",
    capabilities: "Billing and financial operations",
  },
  {
    role: "PM",
    capabilities: "Project execution, task assignment, and time approvals",
  },
  {
    role: "TEAM_MEMBER",
    capabilities: "Assigned projects/tasks and time entry",
  },
  {
    role: "CLIENT",
    capabilities: "Reserved for future client portal scope",
  },
];

export default function AccessSettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Access control</h1>
        <p className="text-sm text-slate-600">
          Server-side RBAC is enforced in route handlers using workspace membership and role checks.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-lg font-medium">Role model</h2>
        <ul className="space-y-2 text-sm">
          {roleCapabilities.map((row) => (
            <li key={row.role} className="rounded-md border border-slate-100 p-3">
              <p className="font-medium">{row.role}</p>
              <p className="text-slate-600">{row.capabilities}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-lg font-medium">Auth header convention (temporary)</h2>
        <p className="text-sm text-slate-600">
          Until Auth.js wiring lands, API routes read <code>x-user-id</code> and <code>x-workspace-id</code>.
        </p>
      </section>
    </div>
  );
}
