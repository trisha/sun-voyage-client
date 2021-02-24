import React from 'react';
const REACT_APP_SERVER_URL ='http://localhost:8000'
const axios = require('axios')
// COULDN'T GET THE BELOW TO WORK, so instead I had to put everything in-line.
// const buttons = Add edit and delete buttons here.
const buttons = (props) => {
    return (
        props.comment.user == props.user.id ? <div><button>Edit</button> <button>Delete</button></div> : ""
)}

const Comment = (props) => {
    return (
        <div>
            {props.comment.content}
            <div>
                Posted by {props.user.name} on {props.comment.createdAt}
            </div>
            <div>
                {props.comment.user == props.user.id ? <div><button >Edit</button> <button>Delete</button></div> : ""}
            </div>
        </div>
    );
}

export default Comment;