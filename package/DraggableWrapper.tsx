import { DragDropContext, Droppable, type OnDragEndResponder } from '@hello-pangea/dnd';
import type { PropsWithChildren } from 'react';

type DraggableWrapperProps = PropsWithChildren<{
  draggableRows?: boolean;
  onDragEnd?: OnDragEndResponder;
  dragKey?: string;
}>;

export function DraggableWrapper({ children, draggableRows, onDragEnd, dragKey }: Readonly<DraggableWrapperProps>) {
  if (!draggableRows) return children;

  return (
    <DragDropContext
      onDragEnd={(result, provided) => {
        onDragEnd?.(result, provided);
      }}
    >
      <Droppable droppableId={dragKey ?? 'dnd-table'} direction="vertical" ignoreContainerClipping>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
