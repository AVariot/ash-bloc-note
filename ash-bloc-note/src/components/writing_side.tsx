import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function WritingSide() {
    const editor = useEditor({ extensions: [StarterKit] })

    const { isBold, isItalic } = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: ctx.editor?.isActive('bold') ?? false,
            isItalic: ctx.editor?.isActive('italic') ?? false,
        }),
    }) ?? { isBold: false, isItalic: false }

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
            </div>

            {/* Zone d'écriture */}
            <EditorContent
                editor={editor}
                className="flex-1 overflow-y-auto prose prose-sm max-w-none [&_.ProseMirror]:min-h-full [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-4"
            />
        </div>
    )
}
