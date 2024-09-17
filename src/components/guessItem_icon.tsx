import Common from '../assets/images/normalGem.png';
import Rare from '../assets/images/rareGem.png';
import Epic from '../assets/images/epicGem.png'
import Legendary from '../assets/images/legendaryGem.png'
import Priest from '../assets/images/priest.png'
import Mage from '../assets/images/mage.png'
import Hunter from '../assets/images/hunter_.png'
import Warlock from '../assets/images/warlock.png'
import Paladin from '../assets/images/paladin.png'
import Warrior from '../assets/images/warrior.png'
import DeathKnight from '../assets/images/deathknight.png'
import Shaman from '../assets/images/shaman.png'
import Rogue from '../assets/images/rogue.png';
import DemonHunter from '../assets/images/demonhunter.png';
import Druid from '../assets/images/druid.png';
import X from '../assets/images/Transparent_X.png';



interface GuessItemImageProps {
    value: string;
    refValue: string;
}

const checkImage = (value: string) => {
    switch (value) {
        case "Common":
            return Common; // Caminho relativo à pasta `public`
        case "Rare":
            return Rare;
        case "Epic":
            return Epic;
        case "Legendary":
            return Legendary;
        case "Priest":
            return Priest;
        case "Mage":
            return Mage;
        case "Hunter":
            return Hunter;
        case "Warlock":
            return Warlock;
        case "Paladin":
            return Paladin;
        case "Warrior":
            return Warrior;
        case "Death Knight":
            return DeathKnight;
        case "Shaman":
            return Shaman;
        case "Rogue":
            return Rogue;
        case "Demon Hunter":
            return DemonHunter;
        case "Druid":
            return Druid;
        default:
            return X;
    }
}

const GuessItemImage: React.FC<GuessItemImageProps> = ({value, refValue}) => {
    return (
        <div className={`flex items-center w-20 h-20 ${refValue === value ? 'bg-green-500' : 'bg-red-500'} flex-col justify-center rounded-lg`}>
           <img className='w-8 h-auto' src={checkImage(value)}/>
            <span className='text-md font-bold'>{value}</span>
        </div>
    );
}

export default GuessItemImage;
