import { useQuery } from "react-query";
import { useHttp } from "~/hooks/http/useHttp";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
