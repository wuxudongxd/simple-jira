// src/mocks/handlers.js
import { rest } from "msw";
import { getItem, setItem } from "localforage";
import { md5 } from "pure-md5";
// import { SignJWT, jwtVerify } from "jose";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const secret = "FWB4*FcK*D^DGYm&kz%8T*Q";

interface IAdmin {
  username: string;
  password: string;
}

const getToken = (req: any): string =>
  req.headers.get("Authorization")?.replace("Bearer ", "");

export async function getUser(req: any) {
  const token = getToken(req);
  if (!token) {
    throw new Error("A token must be provided");
  }
  try {
    // const { payload } = await jwtVerify(token, { type: secret });
    // console.log(payload);
    const payload = token;
    let users: IAdmin[] | null = await getItem("admin");
    return users?.find((u) => u.username === payload);
  } catch (e) {
    throw new Error("Invalid token. Please login again.");
  }
}

export const userHandlers = [
  rest.get(`${apiUrl}/me`, async (req, res, ctx) => {
    const user = await getUser(req);
    if (user) {
      return res(ctx.json(user.username));
    } else {
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid token. Please login again." })
      );
    }
  }),
  rest.post(`${apiUrl}/login`, async (req, res, ctx) => {
    const { username, password } = req.body as IAdmin;
    console.log("login", username, password, md5(password).toString());

    try {
      let users: IAdmin[] | null = await getItem("admin");
      let admin = users?.find(
        (u) =>
          u.username === username && u.password === md5(password).toString()
      );
      console.log(users);

      console.log(admin);

      if (!admin) {
        return res(ctx.status(400), ctx.json("用户名或密码错误"));
      }
    } catch (error: any) {
      return res(ctx.status(400), ctx.json({ message: error.message }));
    }
    // const token = await new SignJWT({ username }).sign({ type: secret });
    const token = username;
    return res(ctx.json({ username, token }));
  }),

  rest.post(`${apiUrl}/register`, async (req, res, ctx) => {
    const { username, password } = req.body as IAdmin;
    try {
      let users: IAdmin[] | null = await getItem("admin");
      let admin = users?.find((u) => u.username === username);
      if (admin) {
        throw new Error("此用户已注册");
      } else {
        users = users ?? [];
        const md5Pwd = md5(password).toString();
        await setItem("admin", [...users, { username, password: md5Pwd }]);
      }
    } catch (error: any) {
      return res(ctx.status(400), ctx.json({ message: error.message }));
    }
    // const token = await new SignJWT({ username }).sign({ type: secret });
    const token = username;
    console.log("username: ", username);
    console.log("token: ", token);

    return res(ctx.json({ username, token }));
  }),
];

export default userHandlers;
