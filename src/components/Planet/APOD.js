import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
const APOD_KEY = process.env.REACT_APP_APOD_KEY
const axios = require('axios')

const APOD = (props) => {

    // GRAB IMAGE FOR USER BASED ON THEIR BIRTHDAY.
    // console.log(props.user)
    const [dailyPic, setDailyPic] = useState(null)

    useEffect(() => {
        if (props.user) {
                // The NASA Astronomy Picture of the Day API only goes back to 1995. This checks if the user is older than that, and if so, assigns their APOD date to their birthday in 1996
                let DOB = Array.from(props.user.DOB)

                if (parseInt(props.user.DOB.substring(0,4)) < 1995) {
                    DOB.splice(0,4, '1996')
                    DOB = DOB.join('')
                } else {
                    DOB = DOB.join('')
                }
        
                // console.log(DOB)
                axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&start_date=${DOB}&end_date=${DOB}`)
                .then(res => {
                    setDailyPic(res.data[0])
                })
        } else {
            console.log('No user logged in for getting an APOD pic based on their birthday')
            axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&count=1`)
            .then(res => {
                console.log("URL for a random APOD picture is: ", res.data[0])
                setDailyPic(res.data[0])
            })
        }
    }, [])

    const picDisplay = dailyPic ? (
        <div className='apod-container'>
            < div className='apod-pic' style={{ backgroundImage: `url(${dailyPic.hdurl})`}} >
                    <div className='apod-desc'>
                        <div className='apod-contents'>

                            <h2 className='bold title apod-title'>NASA's Astronomy Pic of the Day: {dailyPic ? dailyPic.date : null }</h2>
                            {dailyPic.explanation}
                            <button className='link-button apod-button' onClick={()=>{window.location.reload(false)}}>Give me another!</button>
                        
                        </div>
                    </div>
                </div>
        </div>
        ) : <p>Loading...</p>

    return (
        <>
        {picDisplay}
        </>
    );
}

export default APOD;