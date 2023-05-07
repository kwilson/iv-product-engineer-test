import { useCallback, useEffect, useMemo, useState } from "react";
import { gql, useQuery } from "urql";
import { useCategoryMetadata } from "./useCategoryMetadata";

let query = gql`
  query GetGifForCategory($category: String!, $offset: Int!) {
    gifs(limit: 1, offset: $offset, where: { category: { _eq: $category } }) {
      category
      url
    }
  }
`;

interface CategoryQueryResponse {
  gifs: Array<{ category: string; url: string }>;
}

export function useGifFactory(category: string) {
  const { isLoading, count } = useCategoryMetadata(category);
  const [offset, setOffset] = useState(-1);

  // Generate a random offset when loading has finished
  useEffect(() => {
    if (!isLoading) {
      setOffset(getRandomNumber(0, count))      
    }
  }, [isLoading]);

  const [{ data, fetching, error }, refetch] = useQuery<CategoryQueryResponse>({
    query,
    variables: { category, offset },
    pause: isLoading,
  });

  const imageUrl = useMemo(() => data?.gifs?.[0]?.url, [data]);

  const shuffle = useCallback(() => {
    const newOffset = getRandomNumber(0, count);
    setOffset(newOffset)
    refetch({ variables: { category, offset: newOffset } });
  }, [category, count]);

  return {
    imageUrl,
    isLoading: fetching,
    error,
    shuffle,
  };
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
