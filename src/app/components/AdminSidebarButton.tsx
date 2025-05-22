interface AdminSidebarButtonProps {
  key: string;
  text: string;
  onClick: () => void;
}

export default function AdminSidebarButton({
  text,
  onClick,
}: AdminSidebarButtonProps) {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <li className="p-2">
      <button onClick={handleOnClick}>{text}</button>
    </li>
  );
}
