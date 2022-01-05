import React from 'react'

const Board = (props) => {
    return(
    <li onClick={() => props.handleClick(props.id, props.title, props.owner)} >
        {props.title}
    </li>
    )
}

export default Board;
