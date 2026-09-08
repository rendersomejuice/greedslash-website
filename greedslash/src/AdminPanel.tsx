import { useState } from 'react';

import Post from './components/Post'
import TiptapEditor from './components/TiptapEditor.jsx'

import './App.css'
import style from './style.module.css'

import type {PostData} from './components/Post.jsx'

const serverURL = 'http://localhost:3000'


function AdminPanel () {
    const [body, setBody] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const sendPost = async () => {
        try{
            const response = await fetch(`${serverURL}/api/posts`,{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({title, body})
            });
            if(!response.ok){
                throw new Error('Error sending data');
            }
            const res = await response.json();
            console.log('Server response:', res);
            setBody('');
            setTitle('');
        }catch(error){
            console.error('Error sending post:', error);
        }
    };

    return  <div>
            <div className="titleContainer">
                <h1>ADMIN PANEL</h1>
            </div>
            <div className="ClockContainer">
                <h1>NEW POST</h1>
            </div>
                <h2>Title</h2><input id="post-title-input" className="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>

                <TiptapEditor body={body} setBody={setBody}></TiptapEditor>

                <div className={style.horizontalLayout}>
                    <button className={style.wishListButton} onClick={sendPost}>POST</button>
                </div>
                <div>
                    <Post PostData={{title:title, body:body, date:Date.now()}}></Post>
                </div>
            </div>  
}

export default AdminPanel