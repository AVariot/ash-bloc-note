
import WritingSide from "./components/writing_side";
import Titlebar from "./components/title_side";
import { useEffect, useState } from "react";


function App() {
  const [tab, setTab] = useState<string[]>([""]);
  const [tabSelected, setTabSelected] = useState<number>(0);
  const [tabContent, setTabContent] = useState<string[]>([""]);
  
  function TabBar() {
    return <div className="h-8 w-full shrink-0 flex flex-row bg-[--color-brown-third] overflow-x-auto gap-1">
      {
        tab.map((e, key) => {
          let e_arr = e.split('/');
          return <button key={key} onClick={() => setTabSelected(key)} className={`${ tabSelected == key ? 'bg-[--color-brown-bg]' : '' } pl-2 pr-2`}>
            {e_arr[e_arr.length - 1]}
          </button>
        })
      }
    </div>
  }

  useEffect(() => {}, [tabSelected, tabContent]);

  return (
    <main className="relative flex flex-col h-screen w-screen rounded-2xl overflow-hidden">
      <Titlebar setTab={setTab} setTabContent={setTabContent} />
      <TabBar />
      <WritingSide setTabContent={setTabContent} tabContent={tabContent[tabSelected]} current_path={tab[tabSelected]} />
    </main>
  );
}

export default App;
