import Image from "next/image";


export default function Home() {
  return (
    <>
    <div className = 'bg-[#292524] w-screen h-screen text-[#bdb595] font-sans'>
      <header className='bg-[#1c1917] container mx-auto flex'>
      <audio  src="../music/bg_music_rusy_protiv_yacsherov.mp3"/>
      
        <div className='flex justify-between pt-50px items-center'>
          <img src='../images/logo.png' className='w-7 h-6'/>
          <div>
            <span className='font-bold text-0.6xl '>Goblin Hue</span>
          
          </div>
        </div>
      </header>
    </div>
    </>
  );
}
