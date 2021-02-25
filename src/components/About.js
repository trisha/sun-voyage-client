import React from 'react';
import { Row, Col } from 'react-bootstrap'

const About = () => {
    const teammates = [
        {
            name: 'Elyssa Winch',
            imgURL: 'https://media-exp1.licdn.com/dms/image/C4E03AQHFV87MXIFfCA/profile-displayphoto-shrink_200_200/0/1588485326132?e=1619654400&v=beta&t=Pnfm-LMcLNe87-iI0UTcqrffF_40-Lth4iZHjJKPjoo',
            title: 'Frontend Developer, CSStylist',
            githubURL: 'https://github.com/ElyssaW',
            linkedinURL: 'https://www.linkedin.com/in/elyssa-winch/',
            bio: 'Elyssa is a developer, writer, artist, and terrible picture-taker. She likes to draw, cook, and code. <br><br>She would like to thank her cat Cricket, for emotional support, and DnD, for just generally existing.'
        },
        {
            name: 'Patricia Pan',
            imgURL: 'https://media-exp1.licdn.com/dms/image/C5603AQExvwtz83SW_A/profile-displayphoto-shrink_200_200/0/1611081947490?e=1619654400&v=beta&t=0fZe_modaRsIprbkbv7EHleQ8GmnmPGw1HTHdq1zYyQ',
            title: 'Fullstack Manager',
            githubURL: 'https://github.com/patricia-pan',
            linkedinURL: 'https://www.linkedin.com/in/patricia-pan/',
            bio: 'Trisha is a software engineer with a background in management consulting, as well as chemical and biomedical engineering.<br><br>In her free time, she enjoys painting, backpacking, and doing improv.'
        },
        {
            name: 'Yasaman Forouzesh',
            imgURL: 'https://media-exp1.licdn.com/dms/image/C5603AQGPXnfliT9Zpg/profile-displayphoto-shrink_200_200/0/1599016140804?e=1619654400&v=beta&t=IK-lHyhfjMhNakU_sPoDuXyPFpx2VnzH3X2DXPR5RT4',
            title: 'Backend Developer, Data Wrangler',
            githubURL: 'https://github.com/YasamanForouzesh',
            linkedinURL: 'https://www.linkedin.com/in/yasaman-forouzesh/',
            bio: 'Place text here. Use <br> tags instead of paragraph tags because the paragraph tags give us too much space on top.'
        }
    ]

    const teammateCards = teammates.map((person, i) => (
        < Col className='teammate-col' >
            <div className="teammate">
                <div className='teammate-body'>
                    <img className="profile" src={person.imgURL} alt={person.name} />
                    <h3 className='title bold'>{person.name}</h3>
                    <h5>{person.title}</h5>
                    
                    {/* Below allows us to escape HTML tags. */}
                    <p className='about-bio' dangerouslySetInnerHTML={{ __html: person.bio }} />
                </div>
            
                <p className='logo-bank'>
                    <a href={person.githubURL}><img className="logo" src='githubLogo.png' alt="github logo" /></a> 
                    <a href={person.linkedinURL}><img className="logo" src='linkedinLogo.png' alt="linkedin logo" /></a>
                </p>
            </div>
        </Col>
    ))
    
    return (
        <div className="app-main">
        <div className="about">
            <h1 className='title bold about-title'>About</h1>
            <p>Welcome to Sun Voyage!</p>
            <p>Feeling cooped up or anxious, and don't know what to do with your wanderlust?
            Sun Voyage (pronounced like 'bon voyage') is your go-to for experiencing what it would be like to live in another world!
            </p>

            <p>Engage with other galactic travelers on each planet to create a story together, just like in the game "Once Upon a Time." 
                Each story is 10 comments long, so make your mark and go where no wo|man has gone before, by contributing something unique!
            </p>

            <h1 className='title bold title-team'>The Team</h1>
            <div className="team">
                < Row >
                    {teammateCards}
                </Row>

                {/* <div className="teammate">
                    <img className="profile" src='https://media-exp1.licdn.com/dms/image/C5603AQGPXnfliT9Zpg/profile-displayphoto-shrink_200_200/0/1599016140804?e=1619654400&v=beta&t=IK-lHyhfjMhNakU_sPoDuXyPFpx2VnzH3X2DXPR5RT4' />
                    <h3>Yasaman Forouzesh</h3>
                    <p>
                        Backend Developer, Data Wrangler
                    </p>
                    <p>
                        <img className="logo" src='githubLogo.png' />
                        <img className="logo" src='linkedinLogo.png' />
                    </p>
                </div>

                <div className="teammate">
                    <img className="profile" src='https://media-exp1.licdn.com/dms/image/C5603AQExvwtz83SW_A/profile-displayphoto-shrink_200_200/0/1611081947490?e=1619654400&v=beta&t=0fZe_modaRsIprbkbv7EHleQ8GmnmPGw1HTHdq1zYyQ' />
                    <h3>Patricia Pan</h3>
                    <h5>Fullstack Manager</h5>
                    
                    <p>
                        <img className="logo" src='githubLogo.png' />
                        <img className="logo" src='linkedinLogo.png' />
                    </p>

                </div>

                <div className="teammate">
                <img className="profile" src='https://media-exp1.licdn.com/dms/image/C4E03AQHFV87MXIFfCA/profile-displayphoto-shrink_200_200/0/1588485326132?e=1619654400&v=beta&t=Pnfm-LMcLNe87-iI0UTcqrffF_40-Lth4iZHjJKPjoo' />
                    <h3>Elyssa Winch</h3>
                    <h5>Frontend Developer, CSStylist</h5>
                    <p>
                    Bio goes here. Using line breaks instead of paragraph tags because the margins on the paragraph tags are too much (too much empty space on top).
                    </p>

                    <p>
                        <img className="logo" src='githubLogo.png' />
                        <img className="logo" src='linkedinLogo.png' />
                    </p>
                </div> */}
                
            </div>

        </div>
        </div>
    );
}

export default About;