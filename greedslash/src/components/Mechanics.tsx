import { useEffect, useState } from 'react';
import style from '../style.module.css'

export interface mechanic{
    title: string;
    gif: string;
    description: string;
}

function Mechanics({ mechanic }: { mechanic: mechanic[] }) {
    const [mechanicIndex , setMechanicIndex] = useState<number>(0)
    const[isAnimating, setIsAnimating] = useState<boolean>(false);
    const rotationTime:number = 4000;

    useEffect(() => {

        setIsAnimating(true);

        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);

    },[mechanicIndex]);

    useEffect(() => {
    const interval = setInterval(() => {
      setMechanicIndex((prevIndex) => {
        if(prevIndex < mechanic.length -1){
          return prevIndex + 1;
        } else {
          return 0;
        }
      });

    }, rotationTime);
    return () => clearInterval(interval);
  },[mechanic]);

    const currentMechanic = mechanic[mechanicIndex];

    return(
        <div className={`MechanicContainer`}>
            <h1 className={`${isAnimating ? 'AnimationMech' : ''}`}>{currentMechanic.title}</h1>
            <div className={style.panelContainer}>
                <img src={currentMechanic.gif}></img>
                <p className={style.mechanicShortDescription}>{currentMechanic.description}</p>
            </div>

        </div>
    )
}

export default Mechanics