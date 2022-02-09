import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router";
// import { Board } from "./board";
// import { Task } from "./task";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        {/* <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"board"}>
            <Link to={"board"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"task"}>
            <Link to={"task"}>任务组</Link>
          </Menu.Item>
        </Menu> */}
      </Aside>
      <Main>
        <Routes>
          {/*projects/:projectId/board*/}
          {/* <Route path={"/board"} element={<Board />} /> */}
          {/*projects/:projectId/task*/}
          {/* <Route path={"/task"} element={<Task />} /> */}
          {/* <Navigate to={window.location.pathname + "/board"} replace={true} /> */}
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;