const Header = () => {
    return (
        <div className='bg-brown w-[100%] h-[8%] text-gold font-sans'>
            <header className='bg-dbrown w-[100%] container mx-auto flex h-full'>
                <div className='w-[100%] flex pt-50px items-center'>
                    <div className='ml-4 flex items-center'>
                        <img src='../images/logo.png' width={45} />
                        <span className='font-bold text-2xl mr-auto'>Goblin Hue</span>
                    </div>

                </div>
            </header>
        </div>

    );
}

export default Header;