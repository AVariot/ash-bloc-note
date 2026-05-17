
import WritingSide from "./components/writing_side";
import Titlebar from "./components/title_side";
import { useEffect, useState } from "react";
import { homeDir } from "@tauri-apps/api/path";


function App() {
  const [tab, setTab] = useState<string[]>([]);

  useEffect(() => {
    homeDir().then(home => setTab([`${home}/untitled`]));
  }, []);
  const [tabSelected, setTabSelected] = useState<number>(0);
  const [tabContent, setTabContent] = useState<string[]>([""]);

  function closeTab(index: number) {
    setTab(prev => prev.filter((_, i) => i !== index));
    setTabContent(prev => prev.filter((_, i) => i !== index));
    setTabSelected(prev => Math.max(0, prev > index ? prev - 1 : Math.min(prev, tab.length - 2)));
  }
  
  function TabBar() {
    return <div className="h-[6%] w-full shrink-0 flex flex-row bg-[--color-brown-third] overflow-x-auto gap-1 p-1">
      {
        tab.map((e, key) => {
          let e_arr = e.split('/');
          return <div key={key} className={`${tabSelected == key ? 'bg-[--color-brown-bg]' : ''} flex items-center pl-2 pr-1 rounded-md text-[100%] gap-1`}>
            <span onClick={() => setTabSelected(key)} className="cursor-pointer">{e_arr[e_arr.length - 1]}</span>
            <button onClick={() => closeTab(key)} className="opacity-50 hover:opacity-100 px-1">✕</button>
          </div>
        })
      }
    </div>
  }

  useEffect(() => {}, [tabSelected, tabContent]);

  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
          if (event.ctrlKey && event.key === 'n') {
            event.preventDefault();
            homeDir().then(home => {
              setTab(prev => [...prev, `${home}/untitled`]);
              setTabSelected(prev => prev + 1);
            });
            setTabContent(prev => [...prev, ""]);
          }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative flex flex-col h-screen w-screen rounded-2xl overflow-hidden">
      <Titlebar setTab={setTab} setTabContent={setTabContent} />
      <TabBar />
      {tab[tabSelected] && <WritingSide key={tabSelected} setTabContent={setTabContent} tabContent={tabContent[tabSelected]} current_path={tab[tabSelected]} setCurrentPath={setTab} currentIndex={tabSelected} />}
    </main>
  );
}

export default App;
