import { DragDropContext, Droppable, OnDragEndResponder } from '@hello-pangea/dnd';
import React from 'react';

interface Props extends React.PropsWithChildren {
  draggableRows?: boolean;
  onDragEnd?: OnDragEndResponder;
  dragKey?: string;
}

export default function DraggableWrapper(props: Readonly<Props>) {
  if (!props.draggableRows) {
    return props.children;
  }

  return (
    <DragDropContext
      onDragEnd={(result, provided) => {
        props.onDragEnd?.(result, provided);
      }}
    >
      <Droppable droppableId={props.dragKey ?? 'dnd-table'} direction="vertical" ignoreContainerClipping>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
