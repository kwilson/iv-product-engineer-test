import React, { useCallback, useMemo, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { CategoryButton } from "../CategoryButton";
import styles from "./CategorySelector.module.css";

interface CategorySelectorProps {
  onSelect: (category: string) => void;
  selectedValue: string;
}

export function CategorySelector({
  selectedValue,
  onSelect,
}: CategorySelectorProps) {
  const [filter, setFilter] = useState("");
  const { categories, isLoading, error, refetch } = useCategories();
  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [categories, filter]
  );

  if (isLoading) {
    return (
      <p role="alert" aria-live="assertive">
        Let's find the animals!
      </p>
    );
  }

  if (!categories || error) {
    return (
      <div>
        <p>It looks like the animals are still sleeping!</p>

        <button onClick={refetch}>Wake Them Up!</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <label htmlFor="filter">Type an animal name:</label>
        <input
          className={styles.filterInput}
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {!Boolean(filteredCategories.length) && (
        <p>
          Oh no! We can't find any of those animals just now. Why not try
          searching for something else?
        </p>
      )}

      {Boolean(filteredCategories.length) && (
        <ul className={styles.categories}>
          {filteredCategories.map(({ name }) => (
            <li key={name}>
              <CategoryButton
                name={name}
                onClick={() => onSelect(name)}
                selected={name === selectedValue}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
