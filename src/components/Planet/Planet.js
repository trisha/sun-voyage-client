import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment.js'

const Planet = (props) => {

    let commentList = props.planet.comments.map(comment => {
        return < Comment comment={comment} />
    })

    return (
        <div>
            <h2>{props.planet.name}</h2>

            <h4>Info:</h4>
            <p>Here are some cool planet facts! Wow!</p>

            <h4>Comments: </h4>
            {commentList}

            < Link to={`/comments/add/${props.planet.id}`} ><button>Add To This Entry</button></Link>
        </div>
    );
}

export default Planet;