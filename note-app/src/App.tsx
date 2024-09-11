import Notes from "./components/notes/Notes";


function App() {
  return (
    <>
      <h1 className="text-center font-medium text-2xl py-5 bg-[#47a891]">NotesApp</h1>
      <div className="min-h-[900px] ">
        <Notes/>
      </div>
      <p className="text-center font-medium text-xl py-5 bg-[#47a891]">
        created by nadia with ❤️
      </p>
    </>
  );
}

export default App;
