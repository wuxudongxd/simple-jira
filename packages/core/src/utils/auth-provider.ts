// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

export interface User {
  id?: number;
  name?: string;
  email?: string;
  title?: string;
  organization?: string;
  token?: string;
}

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
console.log("apiUrl", apiUrl);

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = (user: User) => {
  console.log("handleUserResponse", user);
  
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (data: { username: string; password: string }) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(await response.json());
  }
};

export const register = async (data: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    console.log("response: ", response);
    // console.log("response.json: ", await response.json());

    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(await response.json());
  }
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
