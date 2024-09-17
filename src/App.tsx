import { useState, useEffect } from "react";
import "./App.css";
import MainHeader from "./components/mainHeader";
import MainBody from "./components/mainBody";
import GuessRow from "./components/guessRow";
import axios from "axios";

interface Card {
  name: string;
  cardId: string;
  img: string;
  cost: number;
  rarity: string;
  health?: number;
  attack?: number;
  durability?: number;
  cardSet: string;
  playerClass: string;
}

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [randomCard, setRandomCard] = useState<Card | null>(null); // Inicializa como null
  const [previousCard, setPreviousCard] = useState<Card>();
  const [filteredCards, setFilteredCards] = useState(cards);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [canPlay, setCanPlay] = useState(true);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.get("https://hearth-back.onrender.com/cards");
        const data = response.data;
        console.log(data);
        const cards = data.cards.filter((card: any) => card.img);
        console.log(cards);
        setCards(cards);
        setRandomCard(data.randomCard);
        setPreviousCard(data.previousCard);

      } catch (error) {}
    };
    getCards();
  }, []);

  useEffect(() => {
    const checkUserIP = async () => {
      try {
        const response = await axios.get("https://hearth-back.onrender.com/games/check-ip");
        const data = response.data;

        if (!data.canPlay) {
          setCanPlay(false); // Desativa o input se o usuário já ganhou hoje
        }

        // Filtrar e mover as cartas usadas
        const usedCardIds = data.usedCards;
        const initialSelectedCards = cards.filter((card) =>
          usedCardIds.includes(card.cardId)
        );
        const remainingFilteredCards = cards.filter(
          (card) => !usedCardIds.includes(card.cardId)
        );

        setSelectedCards(initialSelectedCards);
        setFilteredCards(remainingFilteredCards);
      } catch (error) {
        console.error("Erro ao verificar o IP:", error);
      }
    };

    checkUserIP();
  }, [cards]);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = filteredCards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, filteredCards]);

  const fetchCardRarity = async (cardID: string) => {
    try {
      const response = await fetch(
        `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${encodeURIComponent(
          cardID
        )}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "1a08719019msh9342cc1cc3d27bfp194ffcjsnffa34247726d",
            "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch card details");
      }

      const cardData = await response.json();
      return cardData[0].rarity;
    } catch (error) {
      console.error("Erro ao buscar a raridade da carta:", error);
      return null;
    }
  };

  const handleCardSelection = async (card: any) => {
    setSuggestions([]);
    setSearchTerm("");

    const rarity = await fetchCardRarity(card.cardId);
    if (rarity) {
      card = { ...card, rarity };
    }
    // Verificar se a carta é a randomCard (jogador vence o jogo)
    if (
      randomCard &&
      card.name.toLowerCase() === randomCard.name.toLowerCase()
    ) {
      try {
        await axios.post('https://hearth-back.onrender.com/games/win-game', { wonAt: new Date() });
        setCanPlay(false);
      } catch (error) {
        console.error('Erro ao atualizar wonAt:', error);
      }
    }
    // Remover cartas com o mesmo nome
    const updatedCards = filteredCards.filter((c) => c.name !== card.name);
    setFilteredCards(updatedCards);

    // Adicionar a carta selecionada ao array selectedCards
    setSelectedCards((prevCards) => [...prevCards, card]);

    // Atualizar o campo usedCards no servidor
  try {
    await axios.post('https://hearth-back.onrender.com/games/update-used-cards', { cardId: card.cardId });
  } catch (error) {
    console.error('Erro ao atualizar usedCards:', error);
  }
  };

  return (
    <main className="flex w-full h-full justify-center bg-[url('../../wallpaper.jpg')] bg-cover bg-no-repeat scroll-auto">
      {randomCard && (
        <div className="w-11/12 max-w-96 h-full flex flex-col flex-initial items-center">
          <h1>Carta de hoje: {randomCard.name}</h1>
          <MainHeader />
          <MainBody
            searchTerm={searchTerm}
            setSearchTerm={canPlay ? setSearchTerm : () => {}}
            suggestions={suggestions}
            handleCardSelection={canPlay ? handleCardSelection : () => {}}
            previousCard={previousCard}
            canPlay={canPlay}
          />
          {randomCard && (
            <div className="w-full overflow-auto min-h-48 h-56 p-3 mt-3 custom-scrollbar bg-amber-700 bg-opacity-45 rounded-md">
              {selectedCards
                .slice()
                .reverse()
                .map((card, index) => (
                  <GuessRow
                    key={index} // Use o índice como chave porque estamos adicionando no final
                    logo={card.img || "https://via.placeholder.com/150"}
                    manaCost={card.cost}
                    rarity={card.rarity}
                    health={card.health || 0}
                    attack={card.attack || 0}
                    durability={card.durability || 0}
                    cardClass={card.playerClass}
                    cardReference={randomCard}
                  />
                ))}
            </div>
          )}

          <div className="w-10/12 h-14 min-h-24 flex justify-center items-center mt-4 absolute bottom-0 bg-blue-200">
            <ins
              key={`ad-${Date.now()}`} // Chave única para cada anúncio
              className="adsbygoogle"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                backgroundColor: "blue",
              }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
              data-ad-format="auto"
            ></ins>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
