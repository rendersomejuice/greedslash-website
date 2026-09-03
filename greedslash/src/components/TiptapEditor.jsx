import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Youtube from '@tiptap/extension-youtube';

import '../App.css'

function TiptapEditor({body, setBody}){

    // Configuración limpia del editor
    const editor = useEditor({
    extensions: [
        StarterKit,
        Youtube.configure({
        inline: false, // El video se comporta como un bloque independiente
        width: 600,
        height: 320,
        }),
    ],
    content: body,
    onUpdate: ({ editor }) => {
        // Guarda el HTML real e iframes limpios en tu estado automáticamente
        setBody(editor.getHTML());
    },
    });

    const addYoutubeVideo = () => {
    const url = prompt('Insert Youtube URL:');
    if (url && editor) {
        editor.commands.setYoutubeVideo({ src: url });
    }
    };

    return(
        <div>
            <div className="editor-toolbar">
                <button 
                onClick={() => editor?.chain().focus().toggleBold().run()}
                style={{ fontWeight: editor?.isActive('bold') ? 'bold' : 'normal' }}
                >
                B
                </button>
                <button 
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                style={{ fontStyle: editor?.isActive('italic') ? 'italic' : 'normal' }}
                >
                I
                </button>
                <button onClick={addYoutubeVideo}>📺 Insert Video</button>
            </div>
        
            <div className="tiptap-editor-container">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default TiptapEditor