
import * as React from 'react';
import { observer } from 'mobx-react';
import { Header } from 'semantic-ui-react';
import SectorStore from './SectorStore';

@observer
export default class Sector extends React.Component {

    /* Pull sector data from alpha vantage */
    componentDidMount = () => {
        SectorStore.setup();
    }

    render() {

        const { title } = SectorStore;

        return (
            <div className='p-5'>
                <Header> {title} </Header>
                <p>{title}swag {title} fdsf</p>
            </div>
        )
    }
}