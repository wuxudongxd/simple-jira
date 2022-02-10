import { Spin } from "antd";
import { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "~/components/common/drag-and-drop";
import {
  useBoards,
  useReorderBoard,
  useReorderTask,
  useTasks,
} from "~/hooks/http";
import { useDocumentTitle } from "~/hooks/useDocumentTitle";

import { BoardColumn } from "./column";
import { CreateBoard } from "./CreateBoard";
import { TaskModal } from "./Modal";
import { SearchPanel } from "./Search";
import {
  useBoardSearchParams,
  useBoardsQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";

export const boardScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: boards, isLoading: boardIsLoading } = useBoards(
    useBoardSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || boardIsLoading;

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col w-full p-12">
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <div className="flex flex-1 overflow-x-scroll">
            <Drop type="COLUMN" direction="horizontal" droppableId="board">
              <DropChild className="flex">
                {boards?.map((board, index) => (
                  <Drag
                    key={board.id}
                    draggableId={"board" + board.id}
                    index={index}>
                    <BoardColumn Board={board} key={board.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateBoard />
          </div>
        )}
        <TaskModal />
      </div>
    </DragDropContext>
  );
};

const useDragEnd = () => {
  const { data: boards } = useBoards(useBoardSearchParams());
  const { mutate: reorderBoard } = useReorderBoard(useBoardsQueryKey());
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
        reorderBoard({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromBoardId = +source.droppableId;
        const toBoardId = +destination.droppableId;
        const fromTask = allTasks.filter(
          (task) => task.boardId === fromBoardId
        )[source.index];
        const toTask = allTasks.filter((task) => task.boardId === toBoardId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromBoardId,
          toBoardId,
          type:
            fromBoardId === toBoardId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [boards, reorderBoard, allTasks, reorderTask]
  );
};
