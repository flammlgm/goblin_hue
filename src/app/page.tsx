"use client"
import { useState } from "react";

import Header from "./components/header";
import Workspace from "./components/workspace";
import SpriteMenu from "./components/sprite-menu";


export default function Home() {
  const groups = [
    {
        title: 'Ванная',
        sprites: [
            { name: '', imageUrl: '../images/bathroom/1.png', description: '' },
            { name: '', imageUrl: '../images/bathroom/2.png', description: '' },
            { name: '', imageUrl: '../images/bathroom/4.png', description: '' },
            { name: '', imageUrl: '../images/bathroom/5.png', description: '' },
            { name: '', imageUrl: '../images/bathroom/3.png', description: '' },
            { name: '', imageUrl: '../images/bathroom/6.png', description: '' },
            { name: '', imageUrl: '../images/bathroom/7.png', description: '' },
            { name: '', imageUrl: '../images/bathroom/8.png', description: '' },
            { name: '', imageUrl: '../images/bathroom/9.png', description: '' },
            { name: '', imageUrl: '../images/bathroom/10.png', description: '' }
        ]
    },
    {
        title: 'Двери',
        sprites: [
            { name: '', imageUrl: '../images/doors/1.png', description: '' },
            { name: '', imageUrl: '../images/doors/2.png', description: '' },
            { name: '', imageUrl: '../images/doors/3.png', description: '' },
            { name: '', imageUrl: '../images/doors/4.png', description: '' },

        ]
    },
    {
        title: '',
        sprites: [
            { name: '', imageUrl: '../images/floorwalls/1.png', description: '' },
            { name: '', imageUrl: '../images/floorwalls/2.png', description: '' },
            { name: '', imageUrl: '../images/floorwalls/3.png', description: '' },
            { name: '', imageUrl: '../images/floorwalls/4.png', description: '' },
            { name: '', imageUrl: '../images/floorwalls/5.png', description: '' },
            { name: '', imageUrl: '../images/floorwalls/6.png', description: '' },
            { name: '', imageUrl: '../images/floorwalls/7.png', description: '' },
            { name: '', imageUrl: '../images/floorwalls/8.png', description: '' },
            { name: '', imageUrl: '../images/floorwalls/9.png', description: '' }

        ]
    },
    {
        title: 'Мебель',
        sprites: [
            { name: '', imageUrl: '../images/furniture/1.png', description: '' },
            { name: '', imageUrl: '../images/furniture/2.png', description: '' },
            { name: '', imageUrl: '../images/furniture/3.png', description: '' },
            { name: '', imageUrl: '../images/furniture/4.png', description: '' },
            { name: '', imageUrl: '../images/furniture/5.png', description: '' },
            { name: '', imageUrl: '../images/furniture/6.png', description: '' },
            { name: '', imageUrl: '../images/furniture/7.png', description: '' },
            { name: '', imageUrl: '../images/furniture/8.png', description: '' },
            { name: '', imageUrl: '../images/furniture/9.png', description: '' },
            { name: '', imageUrl: '../images/furniture/10.png', description: '' },
            { name: '', imageUrl: '../images/furniture/11.png', description: '' },
            { name: '', imageUrl: '../images/furniture/12.png', description: '' },
            { name: '', imageUrl: '../images/furniture/13.png', description: '' },
            { name: '', imageUrl: '../images/furniture/14.png', description: '' },
            { name: '', imageUrl: '../images/furniture/15.png', description: '' },
        ]
    },
    {
        title: 'Кухня',
        sprites: [
            { name: '', imageUrl: '../images/kitchen/1.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/2.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/3.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/4.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/5.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/6.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/7.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/8.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/9.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/10.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/11.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/12.png', description: '' },
            { name: '', imageUrl: '../images/kitchen/13.png', description: '' },

        ]
    },
    {
        title: 'Освещение',
        sprites: [
            { name: '', imageUrl: '../images/lighting/1.png', description: '' },
            { name: '', imageUrl: '../images/lighting/2.png', description: '' },
            { name: '', imageUrl: '../images/lighting/3.png', description: '' },
            { name: '', imageUrl: '../images/lighting/4.png', description: '' },
            { name: '', imageUrl: '../images/lighting/5.png', description: '' },

        ]
    },
    {
        title: 'Настенные украшения',
        sprites: [
            { name: '', imageUrl: '../images/walldecors/1.png', description: '' },
            { name: '', imageUrl: '../images/walldecors/2.png', description: '' },
            { name: '', imageUrl: '../images/walldecors/3.png', description: '' },
            { name: '', imageUrl: '../images/walldecors/4.png', description: '' },
            { name: '', imageUrl: '../images/walldecors/5.png', description: '' },
            { name: '', imageUrl: '../images/walldecors/6.png', description: '' },
            { name: '', imageUrl: '../images/walldecors/7.png', description: '' },
            { name: '', imageUrl: '../images/walldecors/8.png', description: '' },
            { name: '', imageUrl: '../images/walldecors/9.png', description: '' },
            { name: '', imageUrl: '../images/walldecors/10.png', description: '' },
        ]
    }
];

  // это нужно для выбора спрайта из меню и передачи его на холст
  const [selectedSprite, setSelectedSprite] = useState('')
  const handleSpriteSelection = (newSrc: string) => {
    setSelectedSprite(newSrc)
  }

  return (
    
    <div className="h-screen">
      <Header />
      <div id="screen" className='bg-brown 
      w-auto 
      h-[92%]
      text-gold 
       font-sans 
       flex 
       items-stretch
       '>

        <Workspace
          selectedSpriteSrc={selectedSprite}
        />
        <SpriteMenu groups={groups} onSelectSprite={handleSpriteSelection} />
      </div>
    </div>

  );
}
