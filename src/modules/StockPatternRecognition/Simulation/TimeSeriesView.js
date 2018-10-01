import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import SimulationStore from './SimulationStore';
import Options from './Options';
import { observer } from 'mobx-react';

import { FlexibleWidthXYPlot, XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import 'react-vis/dist/style.css';


@observer
export default class TimeSeriesView extends React.Component {

    render() {

        const { timeSeriesData } = SimulationStore;

        var data = timeSeriesData.map((data, index) => {
            return { x: data.date, y: data.price }
        })

        return (

            <Segment>

                <Header as='h2' content='Time Series Data' />
                <Divider />
                <FlexibleWidthXYPlot height={400}>
                    <LineSeries data={data} />
                    <XAxis />
                    <YAxis />
                </FlexibleWidthXYPlot>
                <p>{`Start Date: ${SimulationStore.startDate}`}</p>
                <p>{`End Date: ${SimulationStore.endDate}`}</p>
                <p>{`Start Price: ${SimulationStore.startPrice}`}</p>
                <p>{`End Price: ${SimulationStore.endPrice}`}</p>
                <p>{`Number data points: ${SimulationStore.numberDataPoints}`}</p>
            </Segment>


        )
    }
}