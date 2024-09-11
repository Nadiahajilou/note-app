import { useState } from "react";
import { Note, FormData } from "../../types/Note";
import NoteList from "./NoteList";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    content: "",
    deadline: "",
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    // console.log("value:", value, "name:", [name]);
    setFormData((data) => ({ ...data, [name]: value }));
    console.log(formData);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.deadline || !formData.content) {
      setError(true);
    } else {
      setError(false);
    }

    const newNote: Note = {
      id: notes.length + 1,

      content: formData.content,
      deadline: formData.deadline,
      createdAt: new Date(),
      
    };
    setNotes([...notes, newNote]);

    setFormData({
      content: "",
      deadline: "",
    });
  };
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 w-full max-w-6xl mx-auto">
        <div className="w-full lg:w-1/2">
          <h3 className="text-xl font-bold mb-4">Create New Note</h3>
          <form
            className="bg-white shadow-lg rounded-lg p-4 md:p-8"
            onSubmit={submitHandler}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deadline:
                </label>
                <input
                  type="datetime-local"
                  id="deadline"
                  value={formData.deadline}
                  name="deadline"
                  onChange={changeHandler}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content:
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  name="content"
                  onChange={changeHandler}
                  rows={4}
                  className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div >{error ? <p className="text-red-600 font-sm">enter a valid data! </p> : ""}</div>
            <button className="mt-8 w-full bg-[#47a891] text-white p-2 rounded-md hover:bg-[#3e917e] transition duration-300">
              Add
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2">
          <h3 className="text-xl font-bold mb-4">Notes List</h3>
          <div className=" p-4 ">
            <NoteList notes={notes} setNotes={setNotes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
