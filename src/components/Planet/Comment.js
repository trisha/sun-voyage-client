import React from 'react';
const REACT_APP_SERVER_URL ='http://localhost:8000'
const axios = require('axios')

const Comment = (props) => {

    console.log('user data')
    console.log(props.owner)

    return (
        <div className='comment-div'>
            <div className='comment-body'>
                {props.comment.content}
            </div>
                <div className='comment-head'>
                    Posted by <span className='bold'>{props.comment.user}</span>
                    
                    {props.owner ? <> - <span className='comment-button' onClick={() => { props.handleEdit(props.comment) }} >Edit</span> - <span className='comment-button' onClick={() => { props.handleDelete(props.comment, props.planetId) }} >Delete</span></> : ""}
                    </div>
                <div>
            </div>
        </div>
    );
}

export default Comment;