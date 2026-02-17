const navItems = [
  "Dashboard",
  "Clients",
  "Projects",
  "Tasks",
  "Time",
  "Invoicing",
  "Reports",
  "Settings",
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4">
      <div className="mb-6 text-lg font-semibold">Occreva ERP</div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li
              key={item}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
