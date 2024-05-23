const Header = () => {
    return (
        <div className='bg-brown w-[100%] h-[8%] text-gold font-sans'>
            <header className='bg-dbrown w-full container mx-auto flex h-full'>
                <div className='w-screen flex pt-50px items-center'>
                    <div className='ml-4 flex items-center'>
                        <img src='../images/logo.png' width={45} />
                        <span className='font-bold text-0.6xl mr-auto'>Goblin Hue</span>
                    </div>
                    <div className="w-auto flex text-xs items-center ml-auto justify-end">
                        <p className='px-2 '> Контакты</p>
                        <p className='px-2'> О нас</p>
                    </div>
                </div>
            </header>
        </div>

    );
}

export default Header;