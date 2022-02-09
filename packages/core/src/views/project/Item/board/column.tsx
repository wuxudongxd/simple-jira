import React from "react";
import { useTaskTypes } from "utils/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { useTasks } from "utils/task";
import {
  useBoardsQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "~/views/project/Item/board/util";
import { CreateTask } from "~/views/board/create-task";
import { Mark } from "components/mark";
import { useDeleteBoard } from "utils/Board";
import { Row } from "components/lib";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

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
      <Container {...props} ref={ref}>
        <Row between={true}>
          <h3>{Board.name}</h3>
          <More Board={Board} key={Board.id} />
        </Row>
        <TasksContainer>
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
        </TasksContainer>
      </Container>
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

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
