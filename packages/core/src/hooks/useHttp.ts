import { useAdminInfo } from "./useAuth";
import { useCallback } from "react";
import { http } from "utils/http";

/**
 * 返回带有用户token的请求函数
 */
export const useHttp = () => {
  const user = useAdminInfo();

  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
