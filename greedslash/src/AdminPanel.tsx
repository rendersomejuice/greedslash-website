import { useState } from 'react';

import ReactQuill from 'react-quill-new'

import Post from './components/Post'

import './App.css'
import style from './style.module.css'
import 'react-quill-new/dist/quill.snow.css';

function AdminPanel () {
    const [body, setBody] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    return  <div>
                <h2>Title</h2><input className="title-input" type="text" value={title}/>
                <ReactQuill theme="snow" value={body} onChange={setBody} />;
                <button className={style.wishListButton} onClick={()=>{console.log(body)}}>POST</button>
                <button className={style.wishListButton}>PREVIEW</button>
                <div>
                    <Post></Post>
                </div>
            </div>  
}

export default AdminPanel