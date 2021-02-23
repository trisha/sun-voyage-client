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
                comment: 'Here is a cool planet fact'
            }, {
                comment: 'Here is another cool planet fact'
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
                comment: 'Ilium is from Mass Effect'
            }, {
                comment: 'I like Mass Effect'
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
                comment: 'Venus is the Roman goddess of Beauty'
            }, {
                comment: 'Her Greek name is Aphrodite'
            }
        ]
    }
]

export default planets