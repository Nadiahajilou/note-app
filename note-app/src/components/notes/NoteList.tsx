import { NoteListProps,Note } from "../../types/Note";
import NoteItems from "./NoteItems";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

const NoteList: React.FC<NoteListProps> = ({ notes, setNotes }) => {
  console.log("note:", notes);

  //without destination
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(notes); //copy of note 
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="notes">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {notes.length ? (
              notes.map((note: Note, index: number) => (
                <Draggable
                  key={note.id}
                  draggableId={note.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <NoteItems {...note} setNotes={setNotes} />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <p className="text-xl text-center text-[#47a891] font-medium shadow-md rounded-lg p-4 bg-white">
                No note yet !
              </p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    
  );
};

export default NoteList;
