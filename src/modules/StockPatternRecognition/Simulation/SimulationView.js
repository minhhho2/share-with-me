import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import SimulationStore from './SimulationStore';
import TimeSeriesApi from '../../../api/TimeSeriesApi';
import Options from './Options';
import { observer } from 'mobx-react';
import SimulationInputForm from './SimulationInputForm';

import { FlexibleWidthXYPlot, XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import 'react-vis/dist/style.css';
import TimeSeriesView from './TimeSeriesView';


@observer
export default class SimulationView extends React.Component {

    componentDidMount = () => { SimulationStore.setup(); }

    render() {

        const { timeSeriesData } = SimulationStore;

        var data = timeSeriesData.map((data, index) => {
            return { x: data.date, y: data.price }
        })

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