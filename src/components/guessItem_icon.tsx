interface GuessItemImageProps {
    value: string;
    refValue: string;
}

const checkImage = (value: string) => {
    switch (value) {
        case "Common":
            return "/images/normalGem.png"; // Caminho relativo à pasta `public`
        case "Rare":
            return "/images/rareGem.png";
        case "Epic":
            return "/images/epicGem.png";
        case "Legendary":
            return "/images/legendaryGem.png";
        case "Priest":
            return "/images/priest.png";
        case "Mage":
            return "/images/mage.png";
        case "Hunter":
            return "/images/hunter_.png";
        case "Warlock":
            return "/images/warlock.png";
        case "Paladin":
            return "/images/paladin.png";
        case "Warrior":
            return "/images/warrior.png";
        case "Death Knight":
            return "/images/deathknight.png";
        case "Shaman":
            return "/images/shaman.png";
        case "Rogue":
            return "/images/rogue.png";
        case "Demon Hunter":
            return "/images/demonhunter.png";
        case "Druid":
            return "/images/druid.png"
        default:
            return "/images/Transparent_X.png";
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
