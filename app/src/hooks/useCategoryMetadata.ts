import { useMemo } from "react";
import { gql, useQuery } from "urql";

let query = gql`
  query CategoryMetadata($category: String!) {
    gifs_aggregate(where: { category: { _eq: $category } }) {
      aggregate {
        count
      }
    }
  }
`;

interface CategoryMetadataResponse {
  gifs_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export function useCategoryMetadata(category: string) {
  const [{ data, fetching, error }, refetch] =
    useQuery<CategoryMetadataResponse>({
      query,
      variables: {
        category,
      },
    });

  const count = useMemo(
    () => data?.gifs_aggregate?.aggregate?.count ?? 0,
    [data]
  );

  return {
    count,
    isLoading: fetching,
    error,
  };
}
