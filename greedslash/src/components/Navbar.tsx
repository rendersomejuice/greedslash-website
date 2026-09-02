import style from '../style.module.css'
import {Link} from 'react-router-dom'

function Navbar () {

    return(
        <div className={style.NavbarContainer}>
            <div><Link to="/">HOME</Link></div>
            <div><a href="#mechanics">MECHANICS</a></div>
            <div><a href="#characters">CHARACTERS</a></div>
            <div><Link to="Devlog">DEVLOG</Link></div>
        </div>
    );
}

export default Navbar