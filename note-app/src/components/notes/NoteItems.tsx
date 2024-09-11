import { NoteItemsProps } from "../../types/Note";
import { useEffect, useState } from "react";
const NoteItems: React.FC<NoteItemsProps> = ({
  id,

  content,
  deadline,
  createdAt,

  setNotes,
}) => {

  const [isDeadlinePassed, setIsDeadlinePassed] = useState<boolean>(false);
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [editedItems, setEditedItems] = useState<{
    content: string;
    deadline: string;
  }>({ content: content, deadline:deadline });



  const calculateRemainTime = (deadline: string): number => {
    const currentTime = new Date().getTime();
    const deadlineTime = new Date(deadline).getTime();
    return deadlineTime - currentTime;
  };

  useEffect(() => {
    
    const remainingTime = calculateRemainTime(deadline);

  
    if (remainingTime <= 0) {
      setIsDeadlinePassed(true);
    } else {
   
      const countdown = setTimeout(() => {
        setIsDeadlinePassed(true);
      }, remainingTime);


      return () => clearTimeout(countdown);
    }
  }, [deadline]);



  const deleteHandler = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };


  const editHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditedItems((item) => ({ ...item, [name]: value }));
  };


  const saveHandler = (id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              content: editedItems.content,
              deadline: editedItems.deadline,
            }
          : note
      )
    );
    setActiveEdit(false);
  };



  return (
    <>
      {content && deadline ? (
        <div
          className={`shadow-md rounded-lg p-4 relative ${
            isDeadlinePassed ? "bg-red-300" : "bg-white"
          }`}
        >
          <p className="text-sm text-gray-500 mb-2">
            {createdAt.toLocaleString()}
          </p>
          {!activeEdit ? (
            <>
              <p className="text-gray-700">{content}</p>

              <p className="text-sm text-gray-600 mt-2">
                Deadline: {new Date(deadline).toLocaleString()}
              </p>
            </>
          ) : (
            <>
              <textarea
                className="border p-2 rounded w-full mt-2"
                
                defaultValue={editedItems.content}
                onChange={editHandler}
                name="content"
              />
              <input
                type="datetime-local"
                className="border p-2 rounded w-full mt-2"
                
                defaultValue={editedItems.deadline}
                onChange={editHandler}
                name="deadline"
              />
            </>
          )}

          <span
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => deleteHandler(id)}
          >
            <img src="/trash.svg" />
          </span>
          {activeEdit ? (
            <button
              onClick={() => saveHandler(id)}
              className="mt-3 bg-[#47a891] text-white px-2 py-1 rounded text-sm hover:bg-[#3e917e] transition duration-300"
            >
              Save
            </button>
          ) : (
            <span
              className="absolute right-12 top-4 cursor-pointer "
              onClick={() => setActiveEdit(true)}
            >
              <img src="/edit-02.svg" />
            </span>
          )}
        </div>
      ) : null}
    </>
  );
};

export default NoteItems;
