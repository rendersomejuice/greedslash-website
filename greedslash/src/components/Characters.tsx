import { useState } from "react";
import style from '../style.module.css'

export interface character{
    name:string;
    image_url:string;
    description:string;
    lore:string;
    power:string;
    speed:string;
}

function Characters({character}:{character:character[]}){
    const[characterIndex, setCharacterIndex] = useState<number>(0);

    const currentCharacter : character = character[characterIndex];

    const NextCharacter = () : void => {
        setCharacterIndex((prevIndex) =>{
            if(prevIndex < character.length-1) return prevIndex+1;
            else return 0;
        });
    }

    return(
        <div className={style.characterContainer}>
            <div className={style.characterButtonsContainer}>
                {/*<button className={style.characterButton}>LORE</button>*/}
                <button className={style.characterButton} onClick={NextCharacter}>NEXT</button>
            </div>
            <div className={style.characterScreen}>
                <div className={style.charName}><h1>{currentCharacter.name}</h1></div>
                <div><img className={style.characterImg} src={currentCharacter.image_url}></img></div>
                <div className={style.attrContainer}>
                    <div className={`${style.charAttr} ${style.charAttrLeft}`}><p>POWER - {currentCharacter.power}</p></div>
                    <div className={`${style.charAttr} ${style.charAttrRight}`}><p>SPEED - {currentCharacter.speed}</p></div>
                </div>
            </div>
        </div>
    );
}

export default Characters