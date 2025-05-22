import AdminSidebarButton from "./AdminSidebarButton";

type AdminView = 'home' | 'galleries' | 'contact' | 'about';

interface AdminSidebarProps {
  onSelect: (view: AdminView) => void;
}

const buttonNames: { key: AdminView; label: string }[] = [
  { key: "home", label: "Homepage settings" },
  { key: "galleries", label: "Galleries settings" },
  { key: "contact", label: "Contact settings" },
  { key: "about", label: "About settings" },
];

export default function AdminSidebar({ onSelect }: AdminSidebarProps) {
  return (
    <ul className="flex flex-col h-full bg-zinc-700 text-white p-4">
      {buttonNames.map(({ key, label }) => (
        <AdminSidebarButton key={key} text={label} onClick={() => onSelect(key)} />
      ))}
    </ul>
  );
}
