

import { observable } from 'mobx';
import posts from '../posts';


class PostStore {

    @observable post = {};

    setup = (id) => {

        this.post = posts.filter(post => {
            console.log(`Comparing ${typeof(post.id)} to ${id}`)
            return post.id === id;
        })[0];
        console.log(this.post);
    }
}


// get sectors
export default new PostStore();