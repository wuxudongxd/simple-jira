import { Button, Card, Dropdown, Menu, Modal } from "antd";
import bugIcon from "assets/bug.svg";
import taskIcon from "assets/task.svg";
import React from "react";
import { Drag, Drop, DropChild } from "~/components/common/drag-and-drop";
import { Mark } from "~/components/common/mark";
import { useDeleteBoard, useTasks, useTaskTypes } from "~/hooks/http";

import { CreateTask } from "./CreateTask";
import { useBoardsQueryKey, useTasksModal, useTasksSearchParams } from "./util";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType: any) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}>
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const BoardColumn = React.forwardRef<HTMLDivElement, { Board: Board }>(
  ({ Board, ...props }, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter((task: any) => task.BoardId === Board.id);
    return (
      <div
        className="min-w-[27rem] border-8 bg-slate-200 flex flex-col p-3 mr-6"
        {...props}
        ref={ref}>
        <div className="flex items-center justify-between">
          <h3>{Board.name}</h3>
          <More Board={Board} key={Board.id} />
        </div>
        <div className="flex-1 overflow-scroll">
          <Drop
            type={"ROW"}
            direction={"vertical"}
            droppableId={String(Board.id)}>
            <DropChild style={{ minHeight: "1rem" }}>
              {tasks?.map((task: any, taskIndex: any) => (
                <Drag
                  key={task.id}
                  index={taskIndex}
                  draggableId={"task" + task.id}>
                  <div>
                    <TaskCard key={task.id} task={task} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask BoardId={Board.id} />
        </div>
      </div>
    );
  }
);

const More = ({ Board }: { Board: Board }) => {
  const { mutateAsync } = useDeleteBoard(useBoardsQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return mutateAsync({ id: Board.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};
