
import * as React from 'react';
import { observer } from 'mobx-react';
import { Header, Table } from 'semantic-ui-react';
import SectorStore from './SectorStore';

@observer
export default class SectorView extends React.Component {

    /* Pull sector data from alpha vantage */
    componentDidMount = () => {
        SectorStore.setup();
    }

    render() {

        const { title, performanceTypes, sectorPerformances } = SectorStore;

        return (
            <div className='p-5'>
                <Header className='text-white' as='h2' content={title} />



                <Table celled inverted>
                    {/* render column names */}
                    <Table.Header>
                        <Table.Row>
                            {performanceTypes.map((types, index) => {
                                return (
                                    <Table.HeaderCell
                                        key={index}
                                        content={types}
                                    />
                                )
                            })}
                        </Table.Row>
                    </Table.Header>

                    {/* render sector performances */}
                    <Table.Body>
                        {Object.keys(sectorPerformances).map((sector, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{sector}</Table.Cell>
                                    {Object.keys(sectorPerformances[sector]).map((period, index) => {
                                        return (<Table.Cell key={index}>
                                            {sectorPerformances[sector][period]}
                                        </Table.Cell>)
                                    })}
                                </Table.Row>
                            )
                        })}
                    </Table.Body>


                </Table>
            </div>
        )
    }
}