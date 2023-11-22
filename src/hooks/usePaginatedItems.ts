import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { UsePaginatedItemsProps } from "../lib/types";

const usePaginatedItems = <T>({
  queryKey,
  queryFn,
}: UsePaginatedItemsProps<T>) => {
  const { isLoading, data, error } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = data ? Math.ceil(data.length / rowsPerPage) : 1;

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data?.slice(start, end);
  }, [page, data]);

  return { isLoading, error, setPage, paginatedItems, page, totalPages };
};

export default usePaginatedItems;
