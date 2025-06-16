import { ImageIcon, GalleryVertical, Mail, Info } from "lucide-react";
import AdminSidebarButton from "./AdminSidebarButton";
import { ReactNode } from "react";

type AdminView = "home" | "galleries" | "contact" | "about";

interface AdminSidebarProps {
  onSelect: (view: AdminView) => void;
}

const buttonNames: { key: AdminView; label: string; icon: ReactNode }[] = [
  { key: "home", label: "Homepage settings", icon: <ImageIcon /> },
  { key: "galleries", label: "Galleries settings", icon: <GalleryVertical /> },
  { key: "contact", label: "Contact settings", icon: <Mail /> },
  { key: "about", label: "About settings", icon: <Info /> },
];

export default function AdminSidebar({ onSelect }: AdminSidebarProps) {
  return (
    <ul className="flex flex-col h-full bg-zinc-700 text-white p-4 border-r border-white">
      {buttonNames.map(({ key, label, icon }) => (
        <AdminSidebarButton
          key={key}
          text={label}
          icon={icon}
          onClick={() => onSelect(key)}
        />
      ))}
    </ul>
  );
}
