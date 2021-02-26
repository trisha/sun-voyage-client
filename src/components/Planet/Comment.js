import React from 'react';
const REACT_APP_SERVER_URL ='http://localhost:8000'
const axios = require('axios')

const Comment = (props) => {

    console.log('user data')
    console.log(props.user)
    console.log(props.comment)

    return (
        <div className='comment-div'>
            <div className='comment-body'>
                {props.comment.content}
            </div>
            <div className='comment-head'>
                Posted by <span className='bold'>{props.comment.user}</span>
                 </div>
            <div>
                {props.user && props.comment.userId == props.user.id ? <div><button onClick={() => { props.handleEdit(props.comment) }} >Edit</button> <button onClick={() => { props.handleDelete(props.comment, props.planetId) }} >Delete</button></div> : ""}
            </div>
        </div>
    );
}

export default Comment;