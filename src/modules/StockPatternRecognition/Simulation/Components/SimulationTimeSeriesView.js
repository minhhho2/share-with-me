import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import 'react-vis/dist/style.css';

import SimulationStore from '../SimulationStore';

@observer
export default class TimeSeriesView extends React.Component {

    onStartSampling = () => {
        clearInterval(SimulationStore.intervalId);
        SimulationStore.windowPos = 0;
        SimulationStore.intervalId = setInterval(this.timer, 200);
    }

    timer = () => {
        console.log('interval at' + SimulationStore.windowPos);
        SimulationStore.windowPos = SimulationStore.windowPos + 1;

        // stop sampling
        if (SimulationStore.windowPos > SimulationStore.timeSeriesData.length) {
            clearInterval(SimulationStore.intervalId);
        }
    }

    getSample = () => {
        if (SimulationStore.intervalId != null) {
            // configure sample appearance
            var sampleData = [];
            for (var i = SimulationStore.windowPos; i < SimulationStore.windowPos + SimulationStore.period; i++) {
                sampleData.push({ x: i, y: SimulationStore.timeSeriesGraphData[i]['y'] });
            }
            return sampleData;
        } else {
            return [{ x: 100, y: 100 }];
        }

    }


    render() {

        const { timeSeriesData, windowPos, period, timeSeriesAttributes } = SimulationStore;

        // Configure sliding window properties
        var windowData = [];
        for (var i = windowPos; i < windowPos + period; i++) {
            windowData.push({ x: i, y: 0 });
        }

        const xWindowDomain = [0, timeSeriesData.length];

        return (

            <Segment>
                {/* Time Series Chart */}
                <Header as='h2' content='Time Series Data' />
                <Divider />
                <FlexibleWidthXYPlot height={400}>
                    <LineSeries data={SimulationStore.timeSeriesGraphData.slice()} />
                    <XAxis />
                    <YAxis />
                </FlexibleWidthXYPlot>

                {/* Sampling Window Chart */}
                {/* Sliding Window */}
                <FlexibleWidthXYPlot height={100} xDomain={xWindowDomain}>
                    <LineSeries data={windowData} />
                    <XAxis />
                    <YAxis />
                </FlexibleWidthXYPlot>
                <Button type='button' onClick={this.onStartSampling} content='Start Sampling' />

                <Header as='h3' content='Attributes' />
                <p>{`Start Date: ${timeSeriesAttributes.startDate}`}</p>
                <p>{`End Date: ${timeSeriesAttributes.endDate}`}</p>
                <p>{`Start Price: ${timeSeriesAttributes.startPrice}`}</p>
                <p>{`End Price: ${timeSeriesAttributes.endPrice}`}</p>
                <p>{`Number data points: ${timeSeriesAttributes.numberDataPoints}`}</p>
            </Segment>


        )
    }
}