import React from 'react';
const REACT_APP_SERVER_URL ='http://localhost:8000'
const axios = require('axios')

const Comment = (props) => {
    return (
        <div className='comment-div'>
            <div className='comment-body'>
                {props.comment.content}
            </div>
            <div className='comment-head'>
                Posted by <span className='bold'>{props.comment.user}</span> on {props.comment.createdAt}
                <button onClick={() => { props.handleEdit(props.comment) }}>Edit</button>
                <button onClick={() => { console.log('Deleting comment')}}>Delete</button>
            </div>
            <div>
                {props.user && props.comment.user == props.user.id ? <div><button >Edit</button> <button>Delete</button></div> : ""}
            </div>
        </div>
    );
}

export default Comment;