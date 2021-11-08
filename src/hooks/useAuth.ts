import { useQueryClient, useMutation } from "react-query";
import * as auth from "utils/auth-provider";
import { AuthForm, User } from "src/types";

/**
 * 提供对认证用户信息的获取
 */
export const useAuth = () => {
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
  auth.logout().then(useQueryClient().clear);
};
