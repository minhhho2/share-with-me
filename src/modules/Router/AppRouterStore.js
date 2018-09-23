import { observable, action } from 'mobx';

class AppRouterStore {
    @observable activeTab = 'home';

    @action
    setup = () => {
        this.activeTab = 'home';
    }

    @action
    handleTabClick = (e, { name }) => {
        console.log('switching to tab ' + name);
        this.activeTab = name;
    }

}

export default new AppRouterStore();