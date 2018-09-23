

import { observable, action } from 'mobx';

class TodoStore {
    @observable item1 = 'name';         // variable that is used as a state for p element
    @observable item2 = 'name2';
}

export default new TodoStore();