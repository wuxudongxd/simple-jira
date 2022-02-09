import React, { useCallback } from "react";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import {
  useBoardSearchParams,
  useBoardsQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "~/views/project/Item/board/util";
import { BoardColumn } from "~/views/project/Item/board/column";
import styled from "@emotion/styled";
import { useboards, useReorderboard } from "utils/board";
import { SearchPanel } from "views/board/search-panel";
import { ScreenContainer } from "components/lib";
import { useReorderTask, useTasks } from "utils/task";
import { Spin } from "antd";
import { Createboard } from "views/board/create-board";
import { TaskModal } from "views/board/task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { Profiler } from "components/profiler";

export const boardScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: boards, isLoading: boardIsLoading } = useboards(
    useBoardSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || boardIsLoading;

  const onDragEnd = useDragEnd();
  return (
    <Profiler id={"看板页面"}>
      <DragDropContext onDragEnd={onDragEnd}>
        <ScreenContainer>
          <h1>{currentProject?.name}看板</h1>
          <SearchPanel />
          {isLoading ? (
            <Spin size={"large"} />
          ) : (
            <ColumnsContainer>
              <Drop
                type={"COLUMN"}
                direction={"horizontal"}
                droppableId={"board"}>
                <DropChild style={{ display: "flex" }}>
                  {boards?.map((board, index) => (
                    <Drag
                      key={board.id}
                      draggableId={"board" + board.id}
                      index={index}>
                      <BoardColumn board={board} key={board.id} />
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
              <Createboard />
            </ColumnsContainer>
          )}
          <TaskModal />
        </ScreenContainer>
      </DragDropContext>
    </Profiler>
  );
};

export const useDragEnd = () => {
  const { data: boards } = useboards(useBoardSearchParams());
  const { mutate: reorderboard } = useReorderboard(useBoardsQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = boards?.[source.index].id;
        const toId = boards?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderboard({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromboardId = +source.droppableId;
        const toboardId = +destination.droppableId;
        const fromTask = allTasks.filter(
          (task) => task.boardId === fromboardId
        )[source.index];
        const toTask = allTasks.filter((task) => task.boardId === toboardId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromboardId,
          toboardId,
          type:
            fromboardId === toboardId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [boards, reorderboard, allTasks, reorderTask]
  );
};

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
