import * as React from 'react';
import { Header } from 'semantic-ui-react'

export default class AppHeader extends React.Component {
    render() {
        return (
            <div className='p-5'>

                <Header className='text-light' as='h1' content='Share With Me' />

            </div>

        )
    }
}