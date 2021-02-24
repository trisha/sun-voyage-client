import React from 'react';

const About = () => {
    const teammates = [
        {
            name: 'Elyssa Winch',
            imgURL: 'https://media-exp1.licdn.com/dms/image/C4E03AQHFV87MXIFfCA/profile-displayphoto-shrink_200_200/0/1588485326132?e=1619654400&v=beta&t=Pnfm-LMcLNe87-iI0UTcqrffF_40-Lth4iZHjJKPjoo',
            title: 'Frontend Developer, CSStylist',
            githubURL: 'https://github.com/ElyssaW',
            linkedinURL: 'https://www.linkedin.com/in/elyssa-winch/',
            bio: 'Add your bio here.'
        },
        {
            name: 'Patricia Pan',
            imgURL: 'https://media-exp1.licdn.com/dms/image/C5603AQExvwtz83SW_A/profile-displayphoto-shrink_200_200/0/1611081947490?e=1619654400&v=beta&t=0fZe_modaRsIprbkbv7EHleQ8GmnmPGw1HTHdq1zYyQ',
            title: 'Fullstack Manager',
            githubURL: 'https://github.com/patricia-pan',
            linkedinURL: 'https://www.linkedin.com/in/patricia-pan/',
            bio: 'This is a test bio. <br> I added line break HTML elements, let\'s see if it works.'
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
        <div className="teammate">
            <img className="profile" src={person.imgURL} />
            <h3>{person.name}</h3>
            <h5>{person.title}</h5>
            
            {/* Below allows us to escape HTML tags. */}
            <p dangerouslySetInnerHTML={{ __html: person.bio }} />
            
            <p>
                <a href={person.githubURL}><img className="logo" src='githubLogo.png' /></a> 
                <a href={person.linkedinURL}><img className="logo" src='linkedinLogo.png' /></a>
            </p>
        </div>
    ))
    
    return (
        <div className="container">
        <div className="about">
            <h1>About</h1>
            <p>Welcome to Sun Voyage!</p>
            <p>Feeling cooped up or anxious, and don't know what to do with your wanderlust?
            Sun Voyage (pronounced like 'bon voyage') is your go-to for experiencing what it would be like to live in another world!
            </p>

            <p>Engage with other galactic travelers on each planet to create a story together, just like in the game "Once Upon a Time." 
                Each story is 10 comments long, so make your mark and go where no wo|man has gone before, by contributing something unique!
            </p>

            <h1>The Team</h1>
            <div className="team">
                {teammateCards}

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