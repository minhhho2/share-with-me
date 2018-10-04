const MOCK_PATTERNS = {
    defined: [
        {
            name: 'Head and Shoulder',
            values: [0, 5, 0, 10, 0, 5, 0]
        },
        {
            name: 'Double Top',
            values: [0, 10, 0, 10, 0]
        },
        {
            name: 'Triple Top',
            values: [0, 10, 0, 10, 0, 10, 0]
        }
    ],
    sampled: [
        {
            id: 1,
            name: 'Head and Shoulder',
            distance: 10,
            values: [0, 5, 0, 10, 0, 5, 0]
        },
        {
            id: 2,
            name: 'Cup',
            distance: 20,
            values: [10, 4, 2, 0, 2, 4, 10]
        },
        {
            id: 3,
            name: 'Head and Shoulder',
            distance: 10,
            values: [0, 5, 0, 10, 0, 5, 0]
        },
        {
            id: 4,
            name: 'Cup',
            distance: 20,
            values: [10, 4, 2, 0, 2, 4, 10]
        }
    ]
}


module.exports = MOCK_PATTERNS;