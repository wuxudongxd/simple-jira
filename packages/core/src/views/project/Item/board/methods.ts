import { useHttp } from "~/hooks/http/useHttp";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderBoardConfig,
} from "~/utils/optimistic-options";

// TODO: to read

export const useBoard = (param?: Partial<Board>) => {
  const client = useHttp();
  return useQuery<Board[]>(["Boards", param], () =>
    client("Boards", { data: param })
  );
};

export const useAddBoards = (queryKey: QueryKey) => {
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

export interface SortProps {
  // 要重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: "before" | "after";
  fromBoardId?: number;
  toBoardId?: number;
}

export const useReorderBoard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("Boards/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderBoardConfig(queryKey));
};
