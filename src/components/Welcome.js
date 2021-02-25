import React from 'react';

const Welcome = () => {

    return (
      <>
      <div className='welcome-container-div anim' >
        <div className='welcome-container-div anim flipped' >
          <div className='welcome-container-div anim flipped-third' >
          </div>
        </div>
      </div>

      <div className='welcome-container-div'>
        <div className='welcome-div' >
          <h1 className='welcome-title title'>Welcome</h1>
          <span className='welcome-subtitle'>Discover the Solar System</span>
        </div>
      </div>
      </>
    );
}

export default Welcome;