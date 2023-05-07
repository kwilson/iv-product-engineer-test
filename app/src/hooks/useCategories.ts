import { useMemo } from "react";
import { gql, useQuery } from "urql";

let query = gql`
  query Categories {
    gifs(distinct_on: category, order_by: { category: asc }) {
      category
      url
    }
  }
`;

interface Category {
  name: string;
  url: string;
}

interface CategoryQueryResponse {
  gifs: Array<{ category: string; url: string }>;
}

export function useCategories() {
  const [{ data, fetching, error }, refetch] = useQuery<CategoryQueryResponse>({
    query,
  });

  const categories = useMemo<Category[]>(
    () => data?.gifs.map(({ category, url }) => ({ name: category, url })) ?? [],
    [data]
  );

  return {
    categories,
    isLoading: fetching,
    error,
    refetch,
  };
}
