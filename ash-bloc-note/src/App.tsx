
import WritingSide from "./components/writing_side";
import Titlebar from "./components/title_side";


function App() {

  return (
    <main className="relative flex flex-col h-screen w-screen rounded-2xl overflow-hidden">
      <Titlebar />
      <WritingSide />
    </main>
  );
}

export default App;
