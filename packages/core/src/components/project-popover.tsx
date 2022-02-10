import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "~/hooks/http";
import { useProjectModal } from "~/views/project/list/util";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects, refetch } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <div className="min-w-[30rem]">
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button className="p-0" onClick={open} type={"link"}>
        创建项目
      </Button>
    </div>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}>
      <span>项目</span>
    </Popover>
  );
};
