import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDeleteConfig, useReorderBoardConfig } from "~/utils/optimistic-options";

import { useHttp } from "./useHttp";

export const useBoards = (param?: Partial<Board>) => {
  const client = useHttp();

  return useQuery<Board[]>(["Boards", param], () =>
    client("Boards", { data: param })
  );
};

export const useAddBoard = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Board>) =>
      client(`Boards`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteBoard = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`Boards/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};


export const useReorderBoard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("Boards/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderBoardConfig(queryKey));
};
