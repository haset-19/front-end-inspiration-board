import React from 'react'
import Card from './Card.js'

function Board() {
    return (
        <div>
            <h2>Cards for This Board</h2>
            <Card 
            text="You're like a cup of tea: green! 😍"
            likes={3}
            />
            <Card
            text="You're strong and you have good taste in computers. 🐶🎉"
            likes={5} 
            />
        </div>
    )
}

export default Board;