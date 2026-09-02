import './App.css'
import Footer from './components/Footer.tsx'
import Navbar from './components/Navbar.tsx'

import style from './style.module.css'

function Devlog() {

    const logoUrl:string = "./public/LOGO.png"; 

    return (
        <>
        <Navbar></Navbar>
        <img className={style.headerLogo} src={logoUrl}></img>
        <div className="titleContainer">
            <h1>DEVLOG</h1>
        </div>
        <Footer></Footer>
        </>
    )
}

export default Devlog
