import { spriteGroups } from "../global_objects/sprite_group";
import Header from "./components/header";
import Workspace from "./components/workspace";
import SpriteMenu from "./components/sprite-menu";


export default function Home() {
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

        <Workspace />
        <SpriteMenu groups={spriteGroups} />
      </div>
    </div>

  );
}
