import { useState } from 'react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Youtube from '@tiptap/extension-youtube';

import Post from './components/Post'

import './App.css'
import style from './style.module.css'

import type {PostData} from './components/Post.jsx'


function AdminPanel () {
    const [body, setBody] = useState<string>('');
    const [title, setTitle] = useState<string>('');

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



    return  <div>
            <div className="titleContainer">
                <h1>ADMIN PANEL</h1>
            </div>
            <div className="ClockContainer">
                <h1>NEW POST</h1>
            </div>
                <h2>Title</h2><input className="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>

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

                <div className={style.horizontalLayout}>
                    <button className={style.wishListButton} onClick={()=>{console.log(body)}}>POST</button>
                </div>
                <div>
                    <Post PostData={{Title:title, Body:body, Date:Date.now()}}></Post>
                </div>
            </div>  
}

export default AdminPanel