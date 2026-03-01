import { BaseSyntheticEvent, useRef, useState } from "react";

export type KanbanColumn = "todo" | "inProgress" | "done";

export const INITIAL_DATA: Record<KanbanColumn, string[]> = {
  todo: ["Design Homepage", "Setup CI/CD"],
  inProgress: ["Build API"],
  done: ["Project Kickoff"],
};

export const COLUMN_ORDER = [
  "todo",
  "inProgress",
  "done",
] as const satisfies KanbanColumn[];

export const COLUMN_TITLES = {
  todo: "TODO",
  inProgress: "IN PROGRESS",
  done: "DONE",
} as const satisfies Record<KanbanColumn, string>;

export function useKanbanBoard() {
  const [columns, setColumns] = useState(INITIAL_DATA);
  const [taskInput, setTaskInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const draggedTaskRef = useRef<string | null>(null);
  const sourceColRef = useRef<KanbanColumn | null>(null);

  const onTaskInputChange = (value: string) => setTaskInput(value);

  const onAddTask = () => {
    const updatedColumns = structuredClone(columns);
    updatedColumns.todo.push(taskInput);
    setColumns(updatedColumns);
    setTaskInput("");
  };

  const onSearchQueryChange = (value: string) => setSearchQuery(value);

  const onDeleteTask = (
    e: BaseSyntheticEvent,
    col: KanbanColumn,
    task: string,
  ) => {
    const updatedColumns = structuredClone(columns);
    updatedColumns[col] = updatedColumns[col].filter(
      (currTask) => currTask !== task,
    );
    setColumns(updatedColumns);
  };

  const onDragStart = (
    e: BaseSyntheticEvent,
    task: string,
    col: KanbanColumn,
  ) => {
    draggedTaskRef.current = task;
    sourceColRef.current = col;
  };

  const onDragOver = (e: BaseSyntheticEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: BaseSyntheticEvent, col: KanbanColumn) => {
    e.preventDefault();

    const sourceColKey = sourceColRef.current as KanbanColumn;
    const taskInAction = draggedTaskRef.current as KanbanColumn;

    const updatedColumns = structuredClone(columns);

    // remove the task
    updatedColumns[sourceColKey] = updatedColumns[sourceColKey].filter(
      (task: string) => task !== taskInAction,
    );

    // add the task
    updatedColumns[col].push(taskInAction);

    setColumns(updatedColumns);
  };

  const filteredColumns = structuredClone(columns);

  const query = searchQuery.trim().toLowerCase();
  if (query) {
    COLUMN_ORDER.forEach((colKey) => {
      filteredColumns[colKey] = filteredColumns[colKey].filter((task: string) =>
        task.toLowerCase().includes(query),
      );
    });
  }

  return {
    columns: filteredColumns,
    taskInput,
    searchQuery,
    onTaskInputChange,
    onAddTask,
    onDeleteTask,
    onSearchQueryChange,
    onDragStart,
    onDragOver,
    onDrop,
  };
}
