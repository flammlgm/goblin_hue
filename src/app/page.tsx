"use client"
import { useState } from "react";

import Header from "./components/header";
import Workspace from "./components/workspace";
import SpriteMenu from "./components/sprite-menu";

import { spriteGroups } from "@/global_objects/sprite_group";

export default function Home() {

    // это нужно для выбора спрайта из меню и передачи его на холст
    const [selectedSprite, setSelectedSprite] = useState('')
    const handleSpriteSelection = (newSrc: string) => {
        setSelectedSprite(newSrc)
    }

    return (

        <div className="h-screen w-[100%]">
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
                <SpriteMenu groups={spriteGroups} onSelectSprite={handleSpriteSelection} />
            </div>
        </div>

    );
}
