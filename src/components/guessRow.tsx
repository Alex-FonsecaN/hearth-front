import GuessItemNumber from './guessItem_number';
import GuessItemImage from './guessItem_icon';

interface CardReference {
    cost: number;
    rarity: string;
    health?: number;
    attack?: number;
    durability?: number;
    cardSet: string;
    playerClass: string;
    
}
interface GuessRowProps {
    logo: string;  // URL da imagem
    manaCost: number; // Custo de mana da carta
    rarity: string;
    health?: number;
    attack?: number;
    durability: number;
    set: string;
    cardClass: string;
    cardReference: CardReference;
}

const GuessRow: React.FC<GuessRowProps> = ({ logo, manaCost, rarity, health, attack, durability, set, cardClass, cardReference }) => {
    return (
        <div className="flex justify-between items-center gap-5 scroll-auto">
            <div className='flex flex-col justify-start items-center gap-2'>
                <span className='font-bold text-lg'>Card</span>
                <div className='w-24 h-24'>
                    <img src={logo} className='w-full h-full'/>
                </div>
            </div>
            <div className='flex flex-col justify-start items-center gap-5'>
                <span className='font-bold text-lg'>Raridade</span>
                <GuessItemImage value={rarity} refValue={cardReference.rarity}/>
            </div>
            <div className='flex flex-col justify-start items-center gap-5'>
                <span className='font-bold text-lg'>Classe</span>
                <GuessItemImage value={cardClass} refValue={cardReference.playerClass}/>
            </div>
            <div className='flex flex-col justify-start items-center gap-5'>
                <span className='font-bold text-lg'>Mana</span>
                <GuessItemNumber value={manaCost} refValue={cardReference.cost || 0} />
            </div>
            <div className='flex flex-col justify-start items-center gap-5'>
                <span className='font-bold text-lg'>Ataque</span>
                <GuessItemNumber value={attack || 0} refValue={cardReference.attack || 0} />
            </div>
            <div className='flex flex-col justify-start items-center gap-5'>
                <span className='font-bold text-lg'>Vida</span>
                <GuessItemNumber value={health || 0} refValue={cardReference.health || 0}  />
            </div>
            <div className='flex flex-col justify-start items-center gap-5'>
                <span className='font-bold text-lg'>Durabilidade</span>
                <GuessItemNumber value={durability} refValue={cardReference.durability || 0}  />
            </div>
        </div>
    );
}

export default GuessRow;
