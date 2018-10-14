
/* 
    Finds the key for the stock price time series data from alpha vantage api call response.
    The key name is dependent on the period selected, thus, it can be different.
*/
export function getTimeSeriesPriceKeyFromResponse(keys) {

    const key = keys.filter(key => {
        const words = key.split(' ');
        return words.includes('Time') && words.includes('Series');
    });

    if (key.length != 1) {
        console.log("The keys given are " + keys);
        throw new Error(
            `Time Series Key was not among the keys from the response: ${keys}`
        );
    }

    return key[0];
}