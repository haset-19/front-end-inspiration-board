import React from 'react'
import './Card.css'

function Card({ text, likes, addLike, id, deleteCard }){
    return (
        <div className="card">
            <h5 id="text">{text}</h5>
            <h6>{likes}💕</h6>
            <button onClick={() => addLike(id)}>+1</button>
            <button onClick={() => deleteCard(id)}>Delete</button>
        </div>
    )
}

export default Card;