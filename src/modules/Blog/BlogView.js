import * as React from 'react';
import { Card, Image, Button } from 'semantic-ui-react'
import BlogStore from './BlogStore';

export default class AppHeader extends React.Component {

    componentDidMount() {
        BlogStore.setup();
    }

    render() {
        const {posts} = BlogStore;

        return (
            <div className='p-5'>

                <Card.Group className='pl-5' itemsPerRow={5}>


                    {posts.map((post, index) => {
                        return (
                            <Card className='text-center' key={index}>
                                <Card.Content>
                                    <Card.Header>{post.title}</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Meta>by {post.author} | {post.date} | {post.categories.join(' - ')}</Card.Meta>
                                </Card.Content>
                                <Image src='https://cdn4.buysellads.net/uu/1/3386/1525189887-61450.png' />
                                <Card.Content>
                                    <Card.Description>{post.description.substring(0, 100) + ' ... '}</Card.Description>
                                    <Button className='m-3' content='VIEW FULL POST' />
                                </Card.Content>

                            </Card>
                        )
                    })}

                </Card.Group>

            </div>

        )
    }
}