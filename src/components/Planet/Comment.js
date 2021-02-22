import React from 'react';

const Comment = (props) => {
    return (
        <div>
            {props.comment.comment}
        </div>
    );
}

export default Comment;