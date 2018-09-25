import * as React from 'react';
import { Divider, Image, Header } from 'semantic-ui-react'
import PostStore from './PostStore';


export default class PostView extends React.Component {

    componentDidMount() {
        const { match: { params } } = this.props;

        PostStore.setup(params.id);
    }

    render() {

        const { post } = PostStore;

        return (
            <div className='p-5 text-white'>
                <Header as='h3'> {post.title}</Header>
                <p>by {post.author} | {post.date} | {post.categories}</p>
                <Image src='https://cdn4.buysellads.net/uu/1/3386/1525189887-61450.png' />
                <Divider />
                <p> {post.description}</p>
            </div>

        )
    }
}