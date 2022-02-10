import { Divider, List, Popover, Typography } from "antd";
import { useUsers } from "~/hooks/http";

export const UserPopover = () => {
  const { data: users, refetch } = useUsers();

  const content = (
    <div className="min-w-[30rem]">
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}>
      <span>组员</span>
    </Popover>
  );
};
