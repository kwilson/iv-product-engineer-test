import React, { useEffect } from "react";
import { useGifFactory } from "../../hooks/useGifFactory";

import styles from "./GifDisplay.module.css";

interface GifDisplayProps {
  selectedValue: string;
}

export function GifDisplay({ selectedValue }: GifDisplayProps) {
  const { imageUrl, isLoading, shuffle } = useGifFactory(selectedValue);

  if (!selectedValue) {
    return null;
  }

  return (
    <div className={styles.container}>
      {isLoading && <p>Loading...</p>}

      {!isLoading && (
        <>
          <img className={styles.img} src={imageUrl} />
          <button onClick={shuffle}>Another!</button>
        </>
      )}
    </div>
  );
}
