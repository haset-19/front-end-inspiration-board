import React from "react";
import Card from "./Card";

const CardsList = ({ cards }) => {
  const getCardList = (cards) => {
    return cards.map((card) => {
      return (
        <div>
          <Card
            key={card.card_id}
            id={card.card_id}
            message={card.message}
            likes_count={card.likes_count}
          />
        </div>
      );
    });
  };
  return <ul> {getCardList(cards)}</ul>;
};

export default CardsList;
