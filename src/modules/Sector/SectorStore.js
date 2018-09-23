

import { observable } from 'mobx';
import SectorApi from '../../api/SectorApi';


class SectorStore {

    @observable title = 'Sector Performance';
    @observable sectorNames = [];
    @observable performanceTypes = [];

    @observable sectorPerformances = {};

    setup = () => {

        // Pull sector data from alpha vantage
        SectorApi.get().then(res => {
            console.log(res.data);

            const data = res.data;
            this.title = data['Meta Data']['Information'];

            this.sectorNames = Object.keys(res.data['Rank A: Real-Time Performance']);
            this.performanceTypes = this.getPerformanceTypes(res.data)
            this.sectorPerformance = this.getSectorPerformances(res.data);

        }).catch(err => console.log(err));

    }

    getPerformanceTypes = (data) => {

        var keys = Object.keys(data);       // get keys from data
        keys.shift();                       // remove 1st element 'meta-data'
        var performanceTypes = keys.map(elem => {   // clean up column name

            return elem.split(':')[1].replace('Performance', '');
        });
        performanceTypes.unshift('Sector'); // add sector column name
        return performanceTypes;

    }

    getSectorPerformances = (data) => {

        // initiate object
        this.sectorPerformances = {};

        // add object for each sector
        this.sectorNames.forEach(sector => {
            var emptyObject = {};
            this.sectorPerformances[sector] = emptyObject;
        });

        console.log(`sector performances\n ${this.sectorPerformances}`);

        // get categories of data (meta data and list of period performances)
        var performances = Object.keys(data);   
        performances.shift();   // remove meta data category

        console.log(`performances \n ${performances}`);

        // Get main keys -> performances + meta data
        performances.forEach(rankKey => {

            // Get clean performance period name
            var periodName = rankKey.split(':')[1].replace('Performance', '');

            // Get performance for a given period and sector
            const periodPerformances = data[rankKey];
            Object.keys(periodPerformances).forEach(sector => {
                var value = periodPerformances[sector];
                this.sectorPerformances[sector][periodName] = value;
            });
        });
    }
}


// get sectors
export default new SectorStore();