import Image from "next/image";
import Header from "../components/header";
import Workspace from "../components/workspace";
import SpriteMenu from "../components/sprite-menu";





export default function Home() {

  const groups = [
    {
        title: 'Group 1',
        sprites: [
            { name: 'Хуй1', imageUrl: './sprites/1.jpg', description: '' },
            { name: 'Хуй2', imageUrl: './sprites/2.jpg', description: '' },
            { name: 'Хуй3', imageUrl: './sprites/1.jpg', description: '' },
            { name: 'Хуй4', imageUrl: './sprites/2.jpg', description: '' },
            { name: 'Хуй5', imageUrl: './sprites/1.jpg', description: '' },
            { name: 'Хуй6', imageUrl: './sprites/2.jpg', description: '' },
            { name: 'Хуй7', imageUrl: './sprites/1.jpg', description: '' },
            { name: 'Хуй8', imageUrl: './sprites/2.jpg', description: '' }
        ]
    },
    {
        title: 'Group 2',
        sprites: [
            { name: 'Хуй9', imageUrl: './sprites/3.jpg', description: '' },
            { name: 'НеХуй', imageUrl: './sprites/4.jpg', description: '' }
        ]
    }
  ];
  return (
 
    <div className = 'bg-[#292524] w-screen h-screen text-[#bdb595] font-sans'>
      

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

        <Workspace />
        <SpriteMenu groups={groups}/>

      </div>
    </div>
</div>
    );
}
