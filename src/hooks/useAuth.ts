import { useQueryClient, useMutation } from "react-query";
import * as auth from "utils/auth-provider";
import { AuthForm, User } from "src/types";
import { useQuery } from "react-query";
import { http } from "utils/http";

/**
 * 通过本地存储的token进行认证
 */
export const useAuth = () => {
  const bootstrapUser = async () => {
    let data = null;
    const token = auth.getToken();
    if (token) {
      data = await http("me", { token });
    }
    return data;
  };
  return useQuery("auth", bootstrapUser, {
    retry: 0,
  });
};

/**
 * 提供对认证用户信息的获取
 */
export const useAdminInfo = () => {
  return useQueryClient().getQueryData("auth") as User;
};

/**
 * 注册
 */
export const useRegister = () => {
  const mutation = useMutation((form: AuthForm) => auth.register(form));
  const queryClient = useQueryClient();
  if (mutation.isSuccess) {
    queryClient.invalidateQueries("auth");
  }
  return mutation;
};

/**
 * 登录
 */
export const useLogin = () => {
  const mutation = useMutation((form: AuthForm) => auth.login(form));
  const queryClient = useQueryClient();
  if (mutation.isSuccess) {
    queryClient.invalidateQueries("auth");
  }
  return mutation;
};

/**
 * 注销
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    auth.logout().then(queryClient.clear);
  };
};
