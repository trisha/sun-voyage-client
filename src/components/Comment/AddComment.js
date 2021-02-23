import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios')

const Comment = (props) => {

    let [newComment, setNewComment] = useState('')
    let [redirect, setRedirect] = useState(false)

    const updateNewComment = (content) => {
        console.log("content is ", content)
        setNewComment(content)
    }

    if (redirect) return <Redirect to={`/planets/display/${props.planetId}`} />
    console.log(props.planet._id)
    return (
        <div>
            <p>Write your comment here</p>
            <input type='comment' onChange={(e) => {updateNewComment(e.target.value)}} />
            <input type='submit' onClick={() => {
                if (newComment) {props.addComment(newComment, props.planet._id)}
                setRedirect(true)
            }} />
            
            {/* <form>
                <input type="text" name="content"></input>
                <button input type="submit" onClick={(newComment, props.planetId) => props.addComment}>Submit</button>
            </form> */}
        </div>
    );
}

export default Comment;