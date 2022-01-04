import React from 'react'
import Card from './Card.js'
import PropTypes from 'prop-types'
import './CardsList.css'

// function CardsList(props) {
//     return (
//         <div>
//             <h1>{props.cards}</h1>
//             <h2>Cards for This Board</h2>
//             <Card 
//             text="You're like a cup of tea: green! 😍"
//             likes={3}
//             />
//             <Card
//             text="You're strong and you have good taste in computers. 🐶🎉"
//             likes={5} 
//             />
//         </div>
//     )
// }

const CardsList = (props) => {
    const cardComponents = (props.cards).map((card) => {
        return (
            <Card 
            text= {card.message}
            likes={card.likes_count}
            key = {card.id}
            addLike = {props.addLike}
            id = {card.id}
            />
        )
    })
    return (
        <div>
            <h2>Cards for This Board</h2>
            <ul className="cards_list">{cardComponents}</ul>
        </div>
    )
}

// Board.propTypes = {
//     cards: PropTypes.arrayOf(
//       PropTypes.arrayOf(
//         PropTypes.shape({
//           id: PropTypes.number.isRequired,
//           board_id: PropTypes.number.isRequired,
//           message_id: PropTypes.string.isRequired,
//           likes_count: PropTypes.number.isRequired
//         })
//       )
//     )
//   };

export default CardsList;