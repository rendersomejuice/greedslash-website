import { useState } from 'react';

import Post from './components/Post'
import TiptapEditor from './components/TiptapEditor.jsx'

import './App.css'
import style from './style.module.css'

import type {PostData} from './components/Post.jsx'


function AdminPanel () {
    const [body, setBody] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    return  <div>
            <div className="titleContainer">
                <h1>ADMIN PANEL</h1>
            </div>
            <div className="ClockContainer">
                <h1>NEW POST</h1>
            </div>
                <h2>Title</h2><input className="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>

                <TiptapEditor body={body} setBody={setBody}></TiptapEditor>

                <div className={style.horizontalLayout}>
                    <button className={style.wishListButton} onClick={()=>{console.log(body)}}>POST</button>
                </div>
                <div>
                    <Post PostData={{Title:title, Body:body, Date:Date.now()}}></Post>
                </div>
            </div>  
}

export default AdminPanel