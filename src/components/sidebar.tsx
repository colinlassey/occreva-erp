const NAV_ITEMS = [
  "Dashboard",
  "Clients",
  "Projects",
  "Tasks",
  "Time",
  "Invoicing",
  "Reports",
  "Settings"
];

export function Sidebar(): JSX.Element {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-6">
      <h1 className="mb-6 text-lg font-semibold">Occreva ERP</h1>
      <nav>
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <li key={item} className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
