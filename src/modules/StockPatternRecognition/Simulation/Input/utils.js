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
            `Could not find proper time series key from alpha vantage api response \n the keyts are ${keys}`
        );
    }

    return key[0];
}

/* 
    Sort time series data objects into oldest to newest
    a = {
        date: Date Object,
        price: price in string
    }
*/
export function sortTimeSeriesDataByPrice(data) {

    var newData = data.slice();

    newData.sort((a, b) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    // newData.forEach((data, index) => { console.log(index + ": " + data.date); });
    
    return newData; 
}