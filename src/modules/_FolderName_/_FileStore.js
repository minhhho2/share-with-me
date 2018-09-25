

import { observable } from 'mobx';

class NameStore {

    @observable title = 'Sector Performance';
}


// get sectors
export default new NameStore();