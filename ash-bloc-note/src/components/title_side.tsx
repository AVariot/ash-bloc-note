
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { getCurrentWindow } from "@tauri-apps/api/window";

interface TitlebarProps {
  setTab: React.Dispatch<React.SetStateAction<string[]>>;
  setTabContent: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Titlebar({setTab, setTabContent}: TitlebarProps) {
    
    const appWindow = getCurrentWindow();

    async function load_file() {
      const picked = await open({ multiple: false });
      if (!picked) return;
      setTab(prev => ([...prev, picked]));
      const content = await invoke<string>("load_file", { path: picked });
      setTabContent(prev => ([...prev, content]));
      // console.log(content);
    }

    function TitleButton({ onClick, title }: {onClick: () => void, title: string}) {
        return <button
            onClick={onClick}
            className="w-6 h-6 flex items-center justify-center text-[var(--color-gold)] border border-[var(--color-brown)] hover:bg-[var(--color-brown)] text-xs transition-colors"
            title="Fermer"
          >
            {
                title
            }
          </button>
    }

    return <div
        className="relative h-10 flex items-center select-none shrink-0 bg-[var(--color-bg)] border-b-2 border-[var(--color-brown)] p-2"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) appWindow.startDragging();
        }}
      >

        {/* Bouton dossier */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={load_file}
          className="ml-2 px-2 py-0.5 text-[10px] text-[var(--color-gold)] border border-[var(--color-brown)] hover:bg-[var(--color-brown)] hover:text-[var(--color-gold-light)] transition-colors"
        >
          ☩ CODEX
        </button>

        {/* Zone de drag centrale */}
        <div className="flex-1 h-full flex items-center justify-center" onMouseDown={() => appWindow.startDragging()}>
          {/* Ligne décorative gauche */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--color-brown)] mx-3" />
          {/* Titre */}
          <span className="text-[11px] tracking-[0.3em] text-[var(--color-gold)] uppercase font-bold pointer-events-none select-none">
            ✦ Bloc-Note Impérial ✦
          </span>
          {/* Ligne décorative droite */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--color-brown)] mx-3" />
        </div>

        {/* Boutons fenêtre */}
        <div className="relative z-[51] flex items-center gap-1 mr-2" onMouseDown={(e) => e.stopPropagation()}>
            <TitleButton onClick={() => appWindow.minimize()} title={"─"} />
            <TitleButton onClick={() => appWindow.toggleMaximize()} title={"□"} />
            <TitleButton onClick={() => appWindow.close()} title={"✕"} />
        </div>

        </div>
}
