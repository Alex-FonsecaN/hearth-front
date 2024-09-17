import Logo from '../assets/Hearthstone-Emblem.png'

const MainHeader = () => {
    return (
        <div className="w-96 flex flex-col items-center gap-4">
            <img src={Logo} alt="Logo" style={{width: 180, height: 100}} />
            <div className="w-9/12 bg-orange-800 h-16 border-double border-4 flex items-center justify-center border-rose-950">
                <span className='text-sm font-bold text-slate-100 text-center w-full'>Adivinhe a carta do pacote clássico</span>
            </div>
        </div>
    )
}

export default MainHeader;