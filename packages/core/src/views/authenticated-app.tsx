import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { useAdminInfo, useLogout } from "hooks/useAuth";
import SoftwareLogo from "assets/software-logo.svg";
import { resetRoute } from "src/utils";
import { ProjectScreen } from "src/views/project";
import { ProjectListScreen } from "src/views/project/list";
import { ProjectModal } from "src/views/project/list/project-modal";
import { ButtonNoPadding, Row } from "components/lib";
import { ProjectPopover } from "components/project-popover";
import { UserPopover } from "components/user-popover";

export default function AuthenticatedApp() {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={"/projects"} element={<ProjectListScreen />} />
          <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
          <Navigate to={"/projects"} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  );
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          {/* <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} /> */}
          <SoftwareLogo />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const user = useAdminInfo();
  const logout = useLogout();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }>
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
