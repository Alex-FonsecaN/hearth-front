import React from 'react';

const MainBody = ({
  searchTerm,
  setSearchTerm,
  suggestions,
  handleCardSelection,
  previousCard,
  canPlay,
}: {
  searchTerm: string,
  setSearchTerm: (value: string) => void,
  suggestions: any[],
  handleCardSelection: (card: any) => void,
  previousCard?: any,
  canPlay: boolean,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-5 gap-2 relative">
      {canPlay && (
              <input
              className="w-11/12 h-11 rounded-md p-3 text-lg text-black"
              placeholder="Digite o nome da carta"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
      )
      }

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-11/12 bg-white shadow-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((card, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer flex justify-around items-center"
              onClick={() => handleCardSelection(card)}
            >
              <img className='h-auto w-16' src={card.img} />
              <span className='font-bold text-black '>{card.name}</span>
            </div>
          ))}
        </div>
      )}
     {previousCard && <span>Carta de ontem: {previousCard.name}</span>} 
    </div>
  );
};

export default MainBody;
