import React from 'react';
const REACT_APP_SERVER_URL ='http://localhost:8000'
const axios = require('axios')
// COULDN'T GET THE BELOW TO WORK, so instead I had to put everything in-line.
// const buttons = Add edit and delete buttons here.
const buttons = (props) => {
    return (
        props.comment.user == props.user.id ? <div><button>Edit</button> <button>Delete</button></div> : ""
)}
const edit=()=>{
    axios({
        url: `${REACT_APP_SERVER_URL}/comments/edit/6033f85cf487a44600fe84b2/603439d427aff1977941d669`,
        method: 'PUT',
        headers: {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        data:{'message':"this is just test edit comment"}
    }).then(res=>{console.log(res.data)})
        .catch(err=>{
            console.log(`🤞 ${err}`)
        })
}
const Comment = (props) => {
    return (
        <div>
            {props.comment.content}
            <div>
                Posted by {props.comment.user} on {props.comment.createdAt}
            </div>
            <div>
                {props.comment.user == props.user.id ? <div><button >Edit</button> <button>Delete</button></div> : ""}
            </div>
        </div>
    );
}

export default Comment;