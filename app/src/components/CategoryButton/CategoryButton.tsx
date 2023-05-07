import React from "react";

interface CategoryButtonProps {
  name: string;
  selected?: boolean;
  onClick: () => void;
}

export function CategoryButton({
  name,
  onClick,
  selected,
}: CategoryButtonProps) {
  return (
    <button className={selected ? "active" : undefined} onClick={onClick}>
      {name}
    </button>
  );
}
