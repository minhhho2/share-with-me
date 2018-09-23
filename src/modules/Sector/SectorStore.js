

import { observable } from 'mobx';
import SectorApi from '../../api/SectorApi';


class SectorStore {

    @observable activeTab = 'home';

    @observable title = 'Sector Performance';

    setup = () => {
        console.log(this.activeTab);


        /*
        // Pull sector data from alpha vantage
        SectorApi.get().then(res => {
            const data = res.data;

            this.title = data['Meta Data'];
            console.log(res.data);


        }).catch(err => console.log(err));
*/
        // Process data
    }
}


// get sectors
export default new SectorStore();