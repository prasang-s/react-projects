"use client";

import ProjectContainer from "@/components/ProjectContainer";
import "./styles.css";
import { COLUMN_ORDER, COLUMN_TITLES, useKanbanBoard } from "./useKanbanBoard";

export default function KanbanBoard() {
  const {
    columns,
    taskInput,
    searchQuery,
    onTaskInputChange,
    onAddTask,
    onDeleteTask,
    onSearchQueryChange,
    onDragStart,
    onDragOver,
    onDrop,
  } = useKanbanBoard();

  return (
    <ProjectContainer title="Kanban Board">
      {/* search tasks */}
      <div className="block">
        <input
          type="text"
          className="input is-primary"
          placeholder="search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
      </div>

      {/* add task */}
      <div className="block">
        <div className="columns">
          <div className="column is-10">
            <input
              type="text"
              className="input is-primary"
              placeholder="enter task name..."
              value={taskInput}
              onChange={(e) => onTaskInputChange(e.target.value)}
            />
          </div>
          <div className="column is-2">
            <button
              className="button is-primary is-fullwidth"
              disabled={!taskInput.trim()}
              onClick={onAddTask}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* board */}
      <div className="block">
        <div className="columns">
          {COLUMN_ORDER.map((colKey) => (
            <div key={colKey} className="column is-4">
              <div
                className="box is-full-height"
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, colKey)}
              >
                <h2 className="title is-6">{COLUMN_TITLES[colKey]}</h2>

                {columns[colKey].map((task: string, i: number) => (
                  <div
                    key={`${colKey}-${i}`}
                    className="box task-card is-border-1 is-flex is-justify-content-space-between is-gap-1"
                    onDragStart={(e) => onDragStart(e, task, colKey)}
                    draggable
                  >
                    <p>{task}</p>
                    <button
                      className="delete is-small"
                      onClick={(e) => onDeleteTask(e, colKey, task)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProjectContainer>
  );
}
