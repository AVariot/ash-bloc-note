import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function WritingSide() {
    const editor = useEditor({ extensions: [StarterKit] })

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            {/* Barre d'outils */}
            <div className="flex gap-1 px-2 py-1 border-b border-gray-200 bg-gray-50 shrink-0">
                <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 text-sm rounded hover:bg-gray-200 font-bold ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
                >
                    B
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 text-sm rounded hover:bg-gray-200 italic ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
                >
                    I
                </button>
            </div>

            {/* Zone d'écriture */}
            <EditorContent
                editor={editor}
                className="flex-1 overflow-y-auto prose prose-sm max-w-none [&_.ProseMirror]:min-h-full [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-4"
            />
        </div>
    )
}
