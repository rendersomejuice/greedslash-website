import style from '../style.module.css'
import {Link} from 'react-router-dom'

import { HashLink } from 'react-router-hash-link';

function Navbar () {

    return(
        <div className={style.NavbarContainer}>
            <div><Link to="/">HOME</Link></div>
            <div><HashLink to="/#mechanics">MECHANICS</HashLink></div>
            <div><HashLink to="/#characters">CHARACTERS</HashLink></div>
            <div><Link to="Devlog">DEVLOG</Link></div>
        </div>
    );
}

export default Navbar