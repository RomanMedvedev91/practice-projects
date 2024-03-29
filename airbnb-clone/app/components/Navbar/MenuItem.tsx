'use client';

interface MuniItemsProps {
  onClick: () => void;
  label: string;
}
export const MenuItem = ({ onClick, label}: MuniItemsProps) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-bold
      "
    >
      {label}
    </div>
  )
}