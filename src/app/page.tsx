import Image from "next/image";
import Header from "./components/header";
import Workspace from "./components/workspace";
import SpriteMenu from "./components/sprite-menu";


export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <div id="screen" className='bg-[#292524] 
      w-auto 
      h-[90%]
      text-gold 
       font-sans 
       flex 
       items-stretch
       '>

        <Workspace />
        <SpriteMenu />
      </div>
    </div>

  );
}
