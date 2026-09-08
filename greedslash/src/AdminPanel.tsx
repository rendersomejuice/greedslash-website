import { useState } from 'react';

import Post from './components/Post'
import TiptapEditor from './components/TiptapEditor.jsx'
import Login from './components/Login';
import { useAuth } from './components/AuthProvider';

import './App.css'
import style from './style.module.css'

function AdminPanel () {
    const { isLoggedIn } = useAuth();

    const [body, setBody] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const sendPost = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`,{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({title, body}),
                credentials: 'include'
            });

            if(!response.ok){ throw new Error('Error sending data'); }
            const res = await response.json();
            console.log('Server response:', res);
            setBody('');
            setTitle('');
        }catch(error){
            console.error('Error sending post:', error);
        }
    };

    if (!isLoggedIn) {
        return <Login/>;
    }

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
                <div className="ClockContainer"><h1>PREVIEW</h1></div>
                <div>
                    <Post isDeletable={false} PostData={{title:title, body:body, date:Date.now()}}></Post>
                </div>
            </div>  
}

export default AdminPanel