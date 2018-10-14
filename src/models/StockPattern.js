/* 
    Finds the key for the stock price time series data from alpha vantage api call response.
    The key name is dependent on the period selected, thus, it can be different.
*/
export function StockPattern(name, distance, values, date, period, symbol) {
    const argNames = ['name', 'distance', 'values', 'date', 'period'];
    
    /*
    for (var i = 0; i < arguments.length; i++) {
        if(arguments[i] === undefined || arguments[i] === null) {
            console.log(`Error @ StockPattern.js: ${argNames[i]} argument was not provided`);
        }
    };
    */

    const newStockPattern = {
        name: name,
        cost: distance,
        values: values,
        date: date,
        period: period,
        symbol: symbol
    }
    
    return newStockPattern;
}
