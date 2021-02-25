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
        
                console.log(DOB)
                axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&start_date=${DOB}&end_date=${DOB}`)
                .then(res => {
                    setDailyPic(res.data[0])
                })
        } else {
            console.log('nope')
            axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}&count=1`)
            .then(res => {
                console.log(res.data[0])
                setDailyPic(res.data[0])
            })
        }
    }, [])

    const picDisplay = dailyPic ? (
        <>
            < Col>
                < div className='apod-pic' style={{ backgroundImage: `url(${dailyPic.url})`}} >
                    <p className='apod-desc'>{dailyPic.explanation}</p>
                </div>
            </Col>
        </>
        ) : <p>Loading...</p>

    return (
        <div className='container apod-div'>
            < Row>
                <h2 className='bold title apod-title'>NASA's Astronomy Pic of the Day: {dailyPic ? dailyPic.date : null }</h2>
            </Row>
            < Row >
                {picDisplay}
            </Row>

            <button className='link-button apod-button' onClick={()=>{window.location.reload(false)}}>Give me another!</button>
        </div>
    );
}

export default APOD;