import { getItem, setItem } from "localforage";
import { rest } from "msw";
import { md5 } from "pure-md5";

// import { SignJWT, jwtVerify } from "jose";

const apiUrl = "http://localhost:3001";
const secret = "FWB4*FcK*D^DGYm&kz%8T*Q";

interface IAdmin {
  username: string;
  password: string;
}

const getToken = (req: any): string => {
  return req.headers.get("Authorization")?.replace("Bearer ", "");
};

export async function getUser(req: any) {
  const token = getToken(req);
  console.log("token", token);

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
      return res(ctx.json({ name: user.username }));
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
    return res(ctx.json({ username, token }));
  }),
  rest.get(`${apiUrl}/users`, async (req, res, ctx) => {
    const users = (await getItem("users")) as any;
    return res(ctx.json(users));
  }),
];

export const ProjectHandlers = [
  rest.get(`${apiUrl}/projects`, async (req, res, ctx) => {
    const user = await getUser(req);
    if (user) {
      const projects = (await getItem("projects")) as any;
      console.log("projects: ", projects);
      return res(ctx.json(projects));
    } else {
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid token. Please login again." })
      );
    }
  }),
  rest.patch(`${apiUrl}/projects/:id`, async (req, res, ctx) => {
    const user = await getUser(req);
    if (user) {
      const { id } = req.params;
      const { name, personId, pin, organization } = req.body as any;
      const projects = (await getItem("projects")) as any;
      const project = projects.find((p: any) => p.id === Number(id));

      if (project) {
        name && (project.name = name);
        personId && (project.personId = personId);
        pin !== undefined && (project.pin = pin);
        organization && (project.organization = organization);
        await setItem("projects", projects);
      }
      return res(ctx.json(project));
    } else {
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid token. Please login again." })
      );
    }
  }),
  rest.post(`${apiUrl}/projects`, async (req, res, ctx) => {
    const user = await getUser(req);
    if (user) {
      const { name, personId, pin, organization } = req.body as any;
      const projects = (await getItem("projects")) as any;
      const id = projects.length + 1;
      const project = { id, name, personId, pin, organization };
      await setItem("projects", [...projects, project]);
      return res(ctx.json(project));
    } else {
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid token. Please login again." })
      );
    }
  }),
  rest.delete(`${apiUrl}/projects/:id`, async (req, res, ctx) => {
    const user = await getUser(req);
    if (user) {
      const { id } = req.params;
      const projects = (await getItem("projects")) as any;
      const project = projects.find((p: any) => p.id === Number(id));
      if (project) {
        await setItem(
          "projects",
          projects.filter((p: any) => p.id !== id)
        );
      }
      return res(ctx.json(project));
    } else {
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid token. Please login again." })
      );
    }
  }),
  rest.get(`${apiUrl}/project/:id`, async (req, res, ctx) => {
    const user = await getUser(req);
    if (user) {
      const { id } = req.params;
      const projects = (await getItem("projects")) as any;
      const project = projects.find((p: any) => p.id === Number(id));
      return res(ctx.json(project));
    } else {
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid token. Please login again." })
      );
    }
  }),
];
