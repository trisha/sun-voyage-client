const planets = [
    {
        id: 0,
        name: 'Pluto',
        moons: [
            { name: 'Orcus' },
            { name: 'Other Moon' }
        ],
        mass: {
            massValue: 11,
            massExponent: 2
        },
        gravity: 2.108,
        escape: 1200,
        sideralOrbit: 783,
        sideralRoation: 1560,
        comments: [
            { 
                text: 'Here is a cool planet fact'
            }, {
                text: 'Here is another cool planet fact'
            }
        ]
    },
    {
        id: 1,
        name: 'Ilium',
        moons: [
            { name: 'Liara' }
        ],
        mass: {
            massValue: 7,
            massExponent: 4
        },
        gravity: .508,
        escape: 600,
        sideralOrbit: 2,
        sideralRoation: 15,
        comments: [
            { 
                text: 'Ilium is from Mass Effect'
            }, {
                text: 'I like Mass Effect'
            }
        ]
    }, {
        id: 2,
        name: 'Venus',
        moons: [],
        mass: {
            massValue: 71,
            massExponent: 2
        },
        gravity: 1.108,
        escape: 1200,
        sideralOrbit: 273,
        sideralRoation: 26,
        comments: [
            { 
                text: 'Venus is the Roman goddess of Beauty'
            }, {
                text: 'Her Greek name is Aphrodite'
            }
        ]
    }
]

export default planets