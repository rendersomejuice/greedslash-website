import '../App.css'
import Header from '../components/Header.tsx'
import Mechanics from '../components/Mechanics.tsx'
import Footer from '../components/Footer.tsx'
import Characters from '../components/Characters.tsx'
import Navbar from '../components/Navbar.tsx'

import type {mechanic} from '../components/Mechanics.tsx'
import type {character} from '../components/Characters.tsx'
import style from '../style.module.css'

function App() {
  const mechanicList : mechanic[] = [
    {
      title: "Overhead",
      gif: "./public/overhead.gif",
      description: "Heavy hit from above"
    },
    {
      title: "Swing",
      gif: "./public/swing.gif",
      description: "Side to side cut"
    },
    {
      title: "Thrust",
      gif: "./public/thrust.gif",
      description: "Frontal cut"
    },
    {
      title: "Kick",
      gif: "./public/kick.gif",
      description: "Guard breaking hit"
    }
  ];

  const parryList : mechanic[] = [
    {
      title: "Parry",
      gif: "./public/normalparry.gif",
      description: "Blocks any attack except the kick"
    },
    {
      title: "Mirror Parry",
      gif: "./public/mirrorparry.gif",
      description: "Grants attack speed boost"
    }
  ];

  const finisherList : mechanic[] = [
    {
      title: "Decapitation",
      gif: "./public/decapitation.gif",
      description: "Hit your opponent in the head"
    },
    {
      title: "Finisher",
      gif: "./public/finisher.gif",
      description: "When health hits 0%"
    },
    {
      title: "Special",
      gif: "./public/special.gif",
      description: "Needs the special bar to be full"
    }
  ];

  const characterList : character[] = [
    {
      name:"MAKAI",
      image_url:"./makai.png",
      description:"",
      lore:"",
      power:"mid",
      speed:"fast",
    },
    {
      name:"ZANGETSU",
      image_url:"./zangetsu.png",
      description:"",
      lore:"",
      power:"strong",
      speed:"slow",
    },
    {
      name:"KAGAKI",
      image_url:"./kagaki.png",
      description:"",
      lore:"",
      power:"strong",
      speed:"mid",
    }
  ];

  

  return (
    <>
      <Navbar></Navbar>
      <Header></Header>
      <div className="ClockContainer"><h1>Release Date - 2027</h1></div>
      <div id="mechanics" className="titleContainer">
        <h1>MECHANICS</h1>
      </div>
      <div className={style.textBox}>
        <p>
          All characters have 3 basic attacks, and a guard breaking kick with their own animations windows and delays.
        </p>
      </div>
      <Mechanics mechanic={mechanicList}></Mechanics>
      <div className={style.textBox}>
        <p>
          There are 2 type of parries. The normal parry can block any attack except the kick.It costs stamina.
          <br/>The mirror parry pushes the attacker, and grants an attack speed boost.It does not costs stamina.
          To perform a mirror parry you need to copy your opponent's attack type.
        </p>
      </div>
      <Mechanics mechanic={parryList}></Mechanics>
      <div className={style.textBox}>
        <p>
          You have 3 ways to finish off your opponent, cutting off his head, with a finisher or with a special finisher.
        </p>
      </div>
      <Mechanics mechanic={finisherList}></Mechanics>
      <div id="characters" className="titleContainer">
        <h1>CHARACTERS</h1>
      </div>
      <Characters character={characterList}></Characters>
      <Footer></Footer>
    </>
  )
}

export default App
