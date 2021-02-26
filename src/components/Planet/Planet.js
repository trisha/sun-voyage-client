import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import Moon from './Moon'
import Comment from './Comment.js'
import moment from 'moment'
const axios = require('axios')
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL
// const REACT_APP_SERVER_URL ='http://localhost:8000'

const Planet = (props) => {

    const [planetData, setPlanetData] = useState({})
    // Yasaman added
    const [comments,setComments]=useState([])
    const [newComment,setNewComment]=useState('')
    const [editComment, setEditComment] = useState(null)
    const [refreshFlag, setRefreshFlag] = useState(false)

    useEffect(() => {
        axios.get(`${REACT_APP_SERVER_URL}/planets/display/${props.planetId}`) 
        // Returns info on the planet.
        .then(rdata => {
            setPlanetData(rdata.data[0])
            let comments=rdata.data[0].comments.map(comment=>{
                return{
                    user:comment.user.name,
                    content:comment.content,
                    id:comment._id,
                    userId: comment.user.id
                }
            })
            setComments([...comments])
        }).catch(err=>{
        })
    }, [refreshFlag])

    const commentUpdate=(e)=>{
        setNewComment(e.target.value)
    }

    const addCommentTodb=(e, planetId)=>{
        e.preventDefault()
        // console.log("hello add comment")
        // console.log(planetId)
        axios({
            url: `${REACT_APP_SERVER_URL}/comments/add/${planetId}`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            data:{
                'comment': newComment,
                'userData': props.user 
            }
            
            }).then(res=>{
                console.log("adding comments")
                console.log(res)
                setComments([...res.data.searchTerm])
            }).catch(() => {
                console.log('error')
            })
            let inputBox = document.getElementsByClassName('comment-input')[0]
            inputBox.value = ''
    }

    const handleEdit = (comment) => {
        setEditComment(comment)
        let inputBox = document.getElementsByClassName('comment-input')[0]
        console.log('Editing...')
        inputBox.value = comment.content
    }

    const putEditedComment = (e, planetId) => {
        e.preventDefault()
        let editedComment = editComment
        editedComment.content = newComment
        axios({
            url: `${REACT_APP_SERVER_URL}/comments/edit/${planetId}/${editedComment.id}`,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            data:{
                'comment': newComment 
            }
            }).then(res=>{
                setComments([...res.data.searchTerm])
            })
        let inputBox = document.getElementsByClassName('comment-input')[0]
        inputBox.value = ''
        setRefreshFlag(!refreshFlag)
        setNewComment(null)
        setEditComment(null)
    }

    const cancelEdit = (e) => {
        e.preventDefault()
        let inputBox = document.getElementsByClassName('comment-input')[0]
        inputBox.value = ''
        setNewComment(null)
        setEditComment(null)
        console.log('Cancelling edit...')
    }

    const handleDelete = (comment, planetId) => {
        console.log(`Deleting comment`)
        console.log('Comment to be deleted: ', comment)
        // console.log(planetId)

        axios({
            url: `${REACT_APP_SERVER_URL}/comments/delete/${planetId}/${comment.id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
            }).then(res=>{
                // console.log('setting refresh')
                setRefreshFlag(!refreshFlag)
        })
    }
    
    //.................................................................
    if (!planetData.name || !planetData.moons) {
        return (
            <p>Loading...</p>
        )
    } else {
            // Populate a value into comment list if any comments exist
            let commentList
            if (comments.length) {
                commentList = comments.map((comment, i) => {
                    console.log(comment)
                    return < Comment comment={comment} user={props.user} key={`comment-id-${i}`} handleEdit={handleEdit} handleDelete={handleDelete} planetId={planetData._id}/>
                })
            } else {
                commentList = <p>No comments yet!</p>
            }
            // Planet info is defined here, outside of the return statement, due to the fact
            // that the way the data is processed changes based on which planet we're looking at - planets with days longer than Earth's require a different formula from planets with days shorter than Earth's, for example
            let planetDayLength
            if (Math.abs(planetData.sideralRotation) > 23.93) {
                planetDayLength = <p>A single day on {planetData.name} is {Math.round(( Math.abs(planetData.sideralRotation) / 24 ))} day(s) on Earth!</p>
            } else {
                planetDayLength = <p>{planetData.name} has {Math.round(( 24 / Math.abs(planetData.sideralRotation) ))} day(s) in a single Earth Day!</p>
            } 

            let planetTimeToOrbit
            if (Math.round(planetData.sideralOrbit) > 365.256) {
                planetTimeToOrbit = <p>It takes {Math.round(planetData.sideralOrbit / 365.256)} years on Earth for {planetData.name} to orbit the sun</p>
            } else {
                planetTimeToOrbit = <p>It takes {Math.round(planetData.sideralOrbit)} days on Earth for {planetData.name} to orbit the sun</p>
            }

            let userData
            if (props.user) {
                userData = props.user
            } else {
                userData = {
                    weight: 150,
                    DOB: '2000-01-01'
                }
            }
            
            let moons = planetData.moons.map(moon => {
                return < Moon moon={moon} />
            })

        return (
            <div className='app-main'>
            <Row className='planet-page'>
                <Col className='col-12' >
                    <div className={`planet-page-image ` + planetData.name.replace(/[0-9]/g, '')}>
                        <h2 className='planet-page-title'>{planetData.name}</h2>

                        <Row >
                            <Col className='planet-info-div col-5'>
                                {planetDayLength}

                                {planetTimeToOrbit}

                                <p>If you weigh {userData.weight} pounds on Earth, you would weigh {Math.round((userData.weight / 9.8) * ( planetData.gravity))} pound(s) on {planetData.name}!</p>

                                <p>On {planetData.name} you would be {Math.floor((moment().diff(`${userData.DOB}`, 'years') * 364.25) / ( planetData.sideralOrbit))} years old!</p>

                                <p>Your next birthday on {planetData.name} will be on {moment().diff(`${userData.DOB}`, 'days') / planetData.sideralOrbit}</p>
                            </Col>
                        </Row>                   
                    </div>
                </Col>
                
            </Row>
            <Row className='planet-page'>
                <h4 className='title bold moons-title'>Moons: {planetData.moons.length}</h4>
            </Row>
            < Row className="moon-container" >
                {moons}
            </Row>
            <Row className='planet-comment-div'>
                    <h4 className='title bold comment-section-head'>Comments: </h4>
                    {commentList}
                    <form>
                        <textarea className='comment-input textbox-big box-shadow' onChange={(e)=>{commentUpdate(e)}}></textarea>
                        
                        { editComment ? (
                            <div>
                            <button className='link-button comment-sub-button' onClick={(e)=>putEditedComment(e, planetData._id)}>Edit Comment</button>
                            <button className='link-button comment-sub-button' onClick={(e)=>{ cancelEdit(e)}}>Cancel edit</button>
                            </div>
                        )
                        :
                        <button className='link-button comment-sub-button' onClick={(e)=>addCommentTodb(e, planetData._id)}>Add To This Entry</button>
                        }


                    </form>
                    {/* < Link to={`/comments/add/${planetData._id}`} ><button className='link-button'>Add To This Entry</button></Link> */}
                </Row>
            </div>
            // <>
            //     <p>{planetData.name}</p>
            //     <p>{console.log(planetData.moons)}</p>
            // </>
        );
    }
}

export default Planet;