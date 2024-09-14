import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import EditorToolbar from "./toolbar/editor-toolbar"
import { cn } from "~/lib/utils"

interface EditorProps {
  className?: string
  content: string
  placeholder?: string
  onChange: (value: string) => void
}

const RichEditor = ({ className, content, placeholder, onChange, ...props }: EditorProps) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[80px] px-5 py-10 focus:outline-none list-disc',
      }
    },
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return <></>

  return (
    <div
      className={cn("max-w-none w-full border border-input", className)}
      {...props}
    >

      <EditorToolbar editor={editor} />
      <div className="min-h-[80px]">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  )
}

export default RichEditor;