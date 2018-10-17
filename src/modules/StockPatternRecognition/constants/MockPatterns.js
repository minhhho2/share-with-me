const MOCK_PATTERNS = {
    defined: [

        {
            name: 'Double Top',
            distance: 0,
            rawValues: [0, 25, 50, 75, 100, 125, 150, 175, 200, 175, 150, 125, 100, 75, 50, 25, 0, 25, 50, 75, 100, 125, 150, 175, 200, 175, 150, 125, 100, 75, 50, 25, 0]
        },
        {
            name: 'Double Bottom',
            distance: 0,
            rawValues: [200, 175, 150, 125, 100, 75, 50, 25, 0, 25, 50, 75, 100, 125, 150, 175, 200, 175, 150, 125, 100, 75, 50, 25, 0, 25, 50, 75, 100, 125, 150, 175, 200]
        }
    ]
}


module.exports = MOCK_PATTERNS;


/*
{
    name: 'Head and Shoulder',
    cost: 0,
    values: [0, 2.5, 5, 2.5, 0, 5, 10, 5, 0, 2.5, 5, 2.5, 0]
}


    sampled: [
        {
            _id: {
                $oid: '1'
            },
            name: 'Head and Shoulder',
            distance: 10,
            values: [0, 5, 0, 10, 0, 5, 0]
        },
        {
            _id: {
                $oid: '2'
            },
            name: 'Cup',
            distance: 20,
            values: [10, 4, 2, 0, 2, 4, 10]
        },
        {
            _id: {
                $oid: '3'
            },
            name: 'Head and Shoulder',
            distance: 10,
            values: [0, 5, 0, 10, 0, 5, 0]
        },
        {
            _id: {
                $oid: '4'
            },
            name: 'Cup',
            distance: 20,
            values: [10, 4, 2, 0, 2, 4, 10]
        }
    ]

    
*/

