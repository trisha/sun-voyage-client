import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios')

const Comment = (props) => {

    let [newComment, setNewComment] = useState('')
    let [redirect, setRedirect] = useState(false)

    const updateNewComment = (content) => {
        setNewComment(content)
    }

    if (redirect) return <Redirect to={`/planets/display/${props.planetId}`} />

    return (
        <div>
            <p>Write your comment here</p>
            <input type='comment' onChange={(e) => {updateNewComment(e.target.value)}} />
            <input type='submit' onClick={() => {
                if (newComment) {props.addComment(newComment, props.planetId)}
                setRedirect(true)
            }} />
<<<<<<< HEAD
            
            {/* <form>
                <input type="text" name="content" onChange={(e) => {updateNewComment(e.target.value)}} />
                <input type="submit" onClick={(props.newComment, props.planetId)=>{props.addComment(newComment, props.planetId)}} />
            </form> */}
=======
>>>>>>> 91c750d55b918ace678d39aa4e483fd4ce0f93b6
        </div>
    );
}

export default Comment;