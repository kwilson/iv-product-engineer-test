import React from "react";

interface CategoryButtonProps {
  name: string;
  onClick: () => void;
}

export function CategoryButton({ name, onClick }: CategoryButtonProps) {
  return <button onClick={onClick}>{name}</button>;
}
