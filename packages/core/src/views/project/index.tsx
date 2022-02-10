import { Button, Dropdown, Menu } from "antd";
import { ProjectPopover } from "components/project-popover";
import { UserPopover } from "components/user-popover";
import { Route, Routes } from "react-router";
import { resetRoute } from "src/utils";
import { ProjectScreen } from "src/views/project/Item";
import { ProjectListScreen } from "src/views/project/list";
import { useAdminInfo, useLogout } from "~/hooks/http/useAuth";
import { ProjectModal } from "~/views/project/list/Modal";

export default function AuthenticatedApp() {
  return (
    <div className="gird grid-rows-[6rem_1fr]">
      <PageHeader />
      <div className="flex overflow-hidden">
        <Routes>
          <Route path="/" element={<ProjectListScreen />} />
          <Route path="/:id/*" element={<ProjectScreen />} />
        </Routes>
      </div>
      <ProjectModal />
    </div>
  );
}

const PageHeader = () => {
  return (
    <div className="flex items-center justify-center p-14 shadow-md">
      <div className="flex justify-center items-center">
        <Button className="p-0" onClick={resetRoute}>
          <div className="bg-[url('assets/software-logo.svg')] w-72 h-8 bg-no-repeat bg-contain"></div>
        </Button>
        <ProjectPopover />
        <UserPopover />
      </div>
      <div className="flex justify-center items-center">
        <User />
      </div>
    </div>
  );
};

const User = () => {
  const user = useAdminInfo();
  const logout = useLogout();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <Button onClick={logout} type="link">
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }>
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};
