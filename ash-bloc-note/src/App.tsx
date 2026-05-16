// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
// import "./App.css";

// function App() {
//   const [greetMsg, setGreetMsg] = useState("");
//   const [name, setName] = useState("");

//   async function greet() {
//     // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//     setGreetMsg(await invoke("greet", { name }));
//   }

//   return (
//     <main className="container">
//       <h1>Welcome to Tauri + React</h1>

//       <div className="row">
//         <a href="https://vite.dev" target="_blank">
//           <img src="/vite.svg" className="logo vite" alt="Vite logo" />
//         </a>
//         <a href="https://tauri.app" target="_blank">
//           <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <p>Click on the Tauri, Vite, and React logos to learn more.</p>

//       <form
//         className="row"
//         onSubmit={(e) => {
//           e.preventDefault();
//           greet();
//         }}
//       >
//         <input
//           id="greet-input"
//           onChange={(e) => setName(e.currentTarget.value)}
//           placeholder="Enter a name..."
//         />
//         <button type="submit">Greet</button>
//       </form>
//       <p>{greetMsg}</p>
//     </main>
//   );
// }

// export default App;

import { useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

function App() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <main className="flex flex-col h-screen bg-white select-none">
      
      {/* Titlebar custom */}
      <div 
        className="flex items-center justify-between bg-gray-100 border-b border-gray-300 text-sm px-2"
        data-tauri-drag-region
      >
        {/* Menu gauche */}
        <div className="flex">
          {["Fichier", "Edition", "Affichage", "Aide"].map((menu) => (
            <div
              key={menu}
              className="relative"
              onMouseEnter={() => setActiveMenu(menu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="px-3 py-1 hover:bg-gray-200 rounded">
                {menu}
              </button>
              {activeMenu === menu && (
                <div className="absolute left-0 bg-white border border-gray-300 shadow-md z-10 w-40">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Option 1
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Titre centré */}
        <span className="text-xs text-gray-500" data-tauri-drag-region>
          ash-bloc-note
        </span>

        {/* Boutons fenêtre */}
        <div className="flex">
          <button
            onClick={() => appWindow.minimize()}
            className="px-3 py-1 hover:bg-gray-200 text-gray-600"
          >─</button>
          <button
            onClick={() => appWindow.toggleMaximize()}
            className="px-3 py-1 hover:bg-gray-200 text-gray-600"
          >□</button>
          <button
            onClick={() => appWindow.close()}
            className="px-3 py-1 hover:bg-red-500 hover:text-white text-gray-600"
          >✕</button>
        </div>
      </div>

      {/* Zone de texte */}
      <textarea
        className="flex-1 p-4 resize-none outline-none font-mono text-sm"
        placeholder="Commencez à écrire..."
      />

    </main>
  );
}

export default App;
