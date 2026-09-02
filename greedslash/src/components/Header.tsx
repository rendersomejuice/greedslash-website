import style from '../style.module.css'

function Header(){

    const logoUrl:string = "./public/LOGO.png";

    return(
        <div>
            <img className={style.headerLogo} src={logoUrl}></img>
            <iframe className={style.Itrailer} width="560" height="315" src="https://www.youtube.com/embed/Qx-7VOF8kBA?si=nhiBrkATDKMHlhYx" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <div className={style.textBox}>
                <p>Fast-paced stylized sword fighting game where timing and prediction decide every duel. Mirror your opponent’s attacks with precision parries and finish them with brutal cinematic finishers. Easy to learn, hard to master.</p>
            </div>
            <div className={style.horizontalLayout}>
                <a className={style.wishListButton} target="_blank" href="steam://store/4521520">WISHLIST</a>
                <a className={style.wishListButton} target="_blank" href="steam://store/4839830">PLAY DEMO</a>
            </div>
        </div>
    )
}

export default Header