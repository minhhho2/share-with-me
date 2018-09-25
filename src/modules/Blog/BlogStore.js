

import { observable } from 'mobx';
import posts from './posts';


class BlogStore {

    @observable posts = [];

    setup = () => {
        this.posts = posts;
    }
}


// get sectors
export default new BlogStore();