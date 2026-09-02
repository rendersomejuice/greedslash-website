import style from "../style.module.css"
import { FaYoutube, FaTwitter, FaTiktok, FaArtstation } from 'react-icons/fa';

function Footer() {

    return(
        <div className={style.footer}>
            <div className={style.socials}>
                <a className={style.social} target="_blank" href="https://www.youtube.com/@RenderSomeJuice"><FaYoutube size={24} /></a>
                <a className={style.social} target="_blank" href="https://x.com/rendersomejuice"><FaTwitter size={24} /></a>
                <a className={style.social} target="_blank" href="https://www.tiktok.com/@flipmetrallattv"><FaTiktok size={24} /></a>
                <a className={style.social} target="_blank" href="https://www.artstation.com/rendersomejuice"><FaArtstation size={24} /></a>
            </div>
        </div>
    );

}

export default Footer