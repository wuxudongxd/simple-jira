import { useQueryClient, useQuery } from "react-query";
import * as auth from "utils/auth-provider";
import { User } from "types/user";

interface AuthForm {
  username: string;
  password: string;
}

/**
 * 提供对认证用户信息的获取
 */
export const useAuth = () => {
  return useQueryClient().getQueryData("auth") as User;
};

/**
 * 注册
 */
export const register = (form: AuthForm) => {
  return useQuery("auth", () => auth.register(form));
};

/**
 * 登录
 */
export const login = (form: AuthForm) => {
  return useQuery("auth", () => auth.login(form));
}


/**
 * 注销
 */
