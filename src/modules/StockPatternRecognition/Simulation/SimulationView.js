import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react';

import SimulationInputForm from './SimulationInputForm';
import TimeSeriesView from './TimeSeriesView';
import SimulationStore from './SimulationStore';


@observer
export default class SimulationView extends React.Component {

    componentDidMount = () => { SimulationStore.setup(); }

    render() {

        const { timeSeriesData } = SimulationStore;

        return (
            <div className='p-5'>

                <Header className='text-center' as='h1' content='Pattern Processing View' />
                <Divider className='m-5' />

                {/* Input Selection */}
                <SimulationInputForm />

                {/* Time Series Data */}
                <TimeSeriesView />

                {/* Sample View */}
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Header as='h1' content='Sample' />
                        <Divider />
                        <Button content='click me'></Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header as='h1' content='Comparing Class' />
                        <Divider />
                        <Button content='click me'></Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header as='h1' content='Identified Classes' />
                        <Divider />
                        <Button content='click me'></Button>
                    </Grid.Column>

                </Grid.Row>


            </div>

        )
    }
}