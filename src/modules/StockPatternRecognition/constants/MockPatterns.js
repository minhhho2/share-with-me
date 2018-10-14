const MOCK_PATTERNS = {
    defined: [

        {
            name: 'Double Top',
            cost: 0,
            values: [0, 50, 100, 150, 200, 150, 100, 50, 0, 50, 100, 150, 200, 150, 100, 50, 0]
//            values: [0, 25, 50, 75, 100, 75, 50, 25, 0, 25, 50, 75, 100, 75, 50, 25, 0]
        },
        {
            name: 'Double Bottom',
            cost: 0,
            values: [200, 150, 100, 50, 0, 50, 100, 150, 200, 150, 100, 50, 0, 50, 100, 150, 200]
//            values: [0, 25, 50, 75, 100, 75, 50, 25, 0, 25, 50, 75, 100, 75, 50, 25, 0]
        }
    ],
    sampled: [
        {
            _id: {
                $oid: '1'
            },
            name: 'Head and Shoulder',
            cost: 10,
            values: [0, 5, 0, 10, 0, 5, 0]
        },
        {
            _id: {
                $oid: '2'
            },
            name: 'Cup',
            cost: 20,
            values: [10, 4, 2, 0, 2, 4, 10]
        },
        {
            _id: {
                $oid: '3'
            },
            name: 'Head and Shoulder',
            cost: 10,
            values: [0, 5, 0, 10, 0, 5, 0]
        },
        {
            _id: {
                $oid: '4'
            },
            name: 'Cup',
            cost: 20,
            values: [10, 4, 2, 0, 2, 4, 10]
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
*/