// src/mocks/handlers.js
import { rest } from "msw";
import { getItem, setItem } from "localforage";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

console.log("MSW - apiUrl: " + apiUrl);

interface IUser {
  id: number;
  name: string;
}
interface IUserFields {
  name: string;
  password: string;
}

const getToken = (req: any): string =>
  req.headers.get("Authorization")?.replace("Bearer ", "");

export async function getUser(req: any) {
  const token = getToken(req);
  if (!token) {
    const error = new Error("A token must be provided");
    // error.status = 401;
    throw error;
  }
  let userId: number = 0;
  try {
    userId = Number(atob(token));
  } catch (e) {
    const error = new Error("Invalid token. Please login again.");
    // error.status = 401;
    throw error;
  }
  let users: IUser[] | null = await getItem("admin");
  return users?.find((u: IUser) => u.id === userId);
}

export const userHandlers = [
  rest.get(`${apiUrl}/me`, async (req, res, ctx) => {
    const user = await getUser(req);
    const token = getToken(req);
    return res(ctx.json({ user: { ...user, token } }));
  }),
  rest.post(`${apiUrl}/login`, async (req, res, ctx) => {
    const { username, password } = req.body as any;
    const userFields = { name: username, password };
    try {
      let users: IUserFields[] | null = await getItem("admin");
      let admin = users?.find((u) => u.password === userFields.password);
      if (!admin) {
        return res(ctx.json("用户名或密码错误"));
      }
    } catch (error: any) {
      return res(ctx.status(400), ctx.json({ message: error.message }));
    }
    return res(ctx.json(userFields.name));
  }),

  rest.post(`${apiUrl}/register`, async (req, res, ctx) => {
    const { username, password } = req.body as any;
    const userFields = { name: username, password };

    try {
      let users: IUserFields[] | null = await getItem("admin");
      let admin = users?.find((u) => u.password === userFields.password);
      if (admin) {
        throw new Error("此用户已注册");
      } else {
        users = users ?? [];
        await setItem("admin", [...users, userFields]);
      }
    } catch (error: any) {
      return res(ctx.status(400), ctx.json({ message: error.message }));
    }
    return res(ctx.json(userFields.name));
  }),

  rest.get(`/hhh`, (req, res, ctx) => {
    return res(ctx.json({ hhh: 111 }));
  }),
];

export default userHandlers;
