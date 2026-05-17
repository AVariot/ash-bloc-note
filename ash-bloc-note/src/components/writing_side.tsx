import { invoke } from '@tauri-apps/api/core';
import { save } from '@tauri-apps/plugin-dialog';
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FontSize, TextStyle } from '@tiptap/extension-text-style'
import { useEffect, useRef, useState } from 'react'

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'];

interface WritingSideProps {
  setTabContent: React.Dispatch<React.SetStateAction<string[]>>;
  tabContent: string,
  current_path: string,
  setCurrentPath: React.Dispatch<React.SetStateAction<string[]>>;
  currentIndex: number;
}

export default function WritingSide({ setTabContent, tabContent, current_path, setCurrentPath, currentIndex }: WritingSideProps) {
    const editor = useEditor({
        extensions: [StarterKit, TextStyle, FontSize],
        content: tabContent,
        onUpdate: ({ editor }) => {
            setTabContent(prev => prev.map((c, i) => i === currentIndex ? editor.getHTML() : c));
        },
        editorProps: {
            handleKeyDown(view, event) {
                if (event.key === ' ' && !event.ctrlKey && !event.metaKey) {
                    view.dispatch(view.state.tr.insertText(' '));
                    return true;
                }
                return false;
            }
        }
    })
    const [_, setPath] = useState<string>(current_path);
    const pathRef = useRef<string>("");

    useEffect(() => {
        if (editor) editor.chain().selectAll().setFontSize('12px').setTextSelection(0).run();
    }, [editor]);

    useEffect(() => {
        const parts = current_path.split("/");
        const filename = parts[parts.length - 1];
        if (filename !== "untitled") {
            pathRef.current = current_path;
            setPath(current_path);
        } else {
            pathRef.current = "";
        }
    }, [current_path]);

    async function saveFile(content: string) {
        let filePath = pathRef.current;
        if (!filePath) {
            const picked = await save();
            if (!picked) return;
            filePath = picked;
            setPath(filePath);
            pathRef.current = filePath;
            setCurrentPath(prev => prev.map((p, i) => i === currentIndex ? picked : p));
        }
        await invoke<boolean>("save_file", { path: filePath, content });
    }

    const { isBold, isItalic, isCode, isH1, fontSize } = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: ctx.editor?.isActive('bold') ?? false,
            isItalic: ctx.editor?.isActive('italic') ?? false,
            isCode: ctx.editor?.isActive('code') ?? false,
            isH1: ctx.editor?.isActive('heading', { level: 1 }) ?? false,
            fontSize: ctx.editor?.getAttributes('textStyle').fontSize ?? '12px',
        }),
    }) ?? { isBold: false, isItalic: false, isCode: false, isH1: false, fontSize: '12px' }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                if (editor) {
                    saveFile(editor.getHTML());
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [editor]);



    return (
        <div className="flex flex-col flex-1 overflow-hidden bg-[--color-brown-bg]">
            {/* Barre d'outils */}
            <div className="flex gap-1 px-2 py-1 bg-[--color-brown-secondary] shrink-0">
                <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 text-sm rounded hover:bg-gray-200 font-bold ${isBold ? 'bg-[var(--color-gold)]' : ''}`}
                >
                    B
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 text-sm rounded hover:bg-gray-200 italic ${isItalic ? 'bg-[var(--color-gold)]' : ''}`}
                >
                    I
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${isCode ? 'bg-[var(--color-gold)]' : ''}`}
                    >
                    C
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${isH1 ? 'bg-[var(--color-gold)]' : ''}`}
                    >
                    H1
                </button>
                <select
                    value={fontSize}
                    onChange={e => editor?.chain().focus().setFontSize(e.target.value).run()}
                    className="px-1 py-1 text-sm rounded bg-transparent border border-[var(--color-brown)] text-[var(--color-gold)]"
                >
                    {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {/* Zone d'écriture */}
            <EditorContent
                editor={editor}
                className="flex-1 overflow-y-auto prose prose-sm max-w-none [&_.ProseMirror]:min-h-full [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-4 [&_.ProseMirror]:whitespace-pre-wrap"
            />
        </div>
    )
}
