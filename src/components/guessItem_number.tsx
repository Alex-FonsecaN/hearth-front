import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faCheck } from '@fortawesome/free-solid-svg-icons';

interface GuessItemNumberProps {
    value: number; // Custo de mana da carta
    refValue: number;
}

const GuessItemNumber: React.FC<GuessItemNumberProps> = ({ value, refValue }) => {
    let dir;
    if(refValue === value) {
        dir =0;
    } else if(refValue > value){
        dir =1;
    } else {
        dir =-1;
    }
    return (
        <div className={`flex items-center w-20 h-20 ${refValue === value ? 'bg-green-500' : 'bg-red-500'} flex-col justify-center rounded-lg`}>
            <FontAwesomeIcon icon={dir == 1 ? faCaretUp : dir == -1 ? faCaretDown : faCheck} className="text-slate-300 text-sm w-4 h-auto" />
            <span className='text-3xl font-bold'>{value}</span>
        </div>
    );
}

export default GuessItemNumber;
