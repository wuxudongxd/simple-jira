interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface AuthForm {
  username: string;
  password: string;
}

interface Board {
  id: number;
  name: string;
  projectId: number;
}

interface Task {
  id: number;
  name: string;
  // 经办人
  processorId: number;
  projectId: number;
  // 任务组
  epicId: number;
  BoardId: number;
  // bug or task
  typeId: number;
  note: string;
}

interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface Board {
  id: number;
  name: string;
  projectId: number;
}

interface Task {
  id: number;
  name: string;
  // 经办人
  processorId: number;
  projectId: number;
  // 任务组
  epicId: number;
  boardId: number;
  // bug or task
  typeId: number;
  note: string;
}

interface SortProps {
  // 要重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: "before" | "after";
  fromBoardId?: number;
  toBoardId?: number;
}

interface TaskType {
  id: number;
  name: string;
}

interface Epic {
  id: number;
  name: string;
  projectId: number;
  // 开始时间
  start: number;
  // 结束时间
  end: number;
}

