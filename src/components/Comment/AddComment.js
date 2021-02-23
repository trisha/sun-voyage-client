import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios')

const Comment = (props) => {

    let [tempComment, setTempComment] = useState('')
    let [redirect, setRedirect] = useState(false)

    const updateTempComment = (content) => {
        setTempComment(content)
    }

    if (redirect) return <Redirect to={`/planets/display/${props.planetId}`} />

    return (
        <div>
            <p>Write your comment here</p>
            <input type='comment' onChange={(e) => {updateTempComment(e.target.value)}} />
            <input type='submit' onClick={() => {
                if (tempComment) {props.addComment(tempComment, props.planetId)}
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