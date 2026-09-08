import '../App.css'
import Footer from '../components/Footer.tsx'
import Navbar from '../components/Navbar.tsx'
import Post from '../components/Post.tsx'

import style from '../style.module.css'

import {useState, useEffect} from 'react'

import type {PostData} from '../components/Post.tsx'

function Devlog() {

    const logoUrl:string = "./public/LOGO.png"; 

    const [posts, setPosts] = useState<PostData[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/api/posts')
        .then( (response) => response.json() )
        .then( (data) => {
            setPosts(data);
        })
        .catch((error) => console.error('Error:', error));
    },[]);

    return (
        <>
            <Navbar></Navbar>
            <img className={style.headerLogo} src={logoUrl}></img>
            <div className="titleContainer">
                <h1>DEVLOG</h1>
            </div>
            <div>
                {
                [...posts].reverse().map((post) => (
                    <Post key={post.id} PostData={post} />
                ))
                }
            </div>
            <Footer></Footer>
        </>
    )
}

export default Devlog
