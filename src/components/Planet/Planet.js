import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment.js'

const Planet = (props) => {

    let commentList = props.planet.comments.map(comment => {
        return < Comment comment={comment} />
    })

    return (
        <div>
            <p>Hello, this is {props.planet.name}</p>

            <p>Here are some cool planet facts! Wow!</p>

            <p>Comment List: </p>
            {commentList}

            < Link to={`/comments/add/${props.planet.id}`} ><button>Add To This Entry</button></Link>
        </div>
    );
}

export default Planet;