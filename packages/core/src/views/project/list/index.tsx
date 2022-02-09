import { Button } from "antd";
import { ErrorBox } from "components/lib";
import { useProjects, useUsers } from "~/hooks/http";
import { useDebounce } from "~/hooks/useDebounce";
import { useDocumentTitle } from "~/hooks/useDocumentTitle";

import { List } from "./list";
import { SearchPanel } from "./Search";
import { useProjectModal, useProjectsSearchParams } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(param, 2000));
  const { data: users } = useUsers();

  return (
    <div className="flex flex-col w-full p-12">
      <div className="flex items-center justify-between">
        <h1>项目列表</h1>
        <Button className="p-0" onClick={open} type={"link"}>
          创建项目
        </Button>
      </div>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </div>
  );
};
