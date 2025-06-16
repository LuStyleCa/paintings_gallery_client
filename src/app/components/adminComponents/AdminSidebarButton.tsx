import { ReactNode } from "react";

interface AdminSidebarButtonProps {
  text: string;
  icon: ReactNode;
  onClick: () => void;
}

export default function AdminSidebarButton({
  text,
  icon,
  onClick,
}: AdminSidebarButtonProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex items-center gap-2 p-2 text-white hover:bg-slate-700 w-full"
      >
        <span className="text-xl">{icon}</span>
        <span className="hidden md:inline">{text}</span> {/* Hide text on small screens */}
      </button>
    </li>
  );
}
