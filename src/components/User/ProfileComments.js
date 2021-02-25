import React from 'react';

const ProfileComments = (props) => {
// props.user (currentUser and info)
// props.planets (all planets and their infor)
    // const comments = props.planets.forEach( (planet,i) => {

    // })
    
    return (
        <div className='app-main'>
            { props.user.name }'s Comments
        </div>
    );
}

export default ProfileComments;