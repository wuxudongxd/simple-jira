import { Link } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router";
import { boardScreen as Board } from "./board";
// import { Task } from "./task";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <div className="grid grid-cols-[16rem_1fr]">
      <div className="flex bg-slate-100">
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"board"}>
            <Link to={"board"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"task"}>
            <Link to={"task"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="flex overflow-hidden shadow-md">
        <Routes>
          <Route path={"/board"} element={<Board />} />
          <Route path={"/task"} element={<Board />} />
          {/* <Navigate to={window.location.pathname + "/board"} replace={true} /> */}
        </Routes>
      </div>
    </div>
  );
};
