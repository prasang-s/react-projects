import { Metadata } from "next";
import KanbanBoard from "./KanbanBoard";

export const metadata: Metadata = {
  title: "Kanban Board",
};

export default function KanbanBoardWrapper() {
  return <KanbanBoard />;
}
