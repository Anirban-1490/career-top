import { PropsWithChildren } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function DNDTrackerWrapper({ children }: PropsWithChildren) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
