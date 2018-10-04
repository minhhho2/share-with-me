const MOCK_PATTERNS = {
    defined: [
        {
            name: 'Head and Shoulder',
            values: [0, 2.5, 5, 2.5, 0, 5, 10, 5, 0, 2.5, 5, 2.5, 0]
        },
        {
            name: 'Double Top',
            values: [0, 3, 6, 9, 6, 3, 0, 3, 6, 9, 6, 3, 0]
        },
        {
            name: 'Triple Top',
            values: [0, 5, 10, 5, 0, 5, 10, 5, 0, 5, 10, 5, 0]
        },
        {
            name: 'Double Botton',
            values: [10, 5, 0, 5, 10, 5, 0, 5, 10, 5, 0, 5, 10]
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