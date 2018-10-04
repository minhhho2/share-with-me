import * as React from 'react';
import { Header, Grid, Divider, Form, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries, XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';

import SimulationStore from '../SimulationStore';

@observer
export default class TimeSeriesView extends React.Component {

    render() {

        const { timeSeriesGraphData } = SimulationStore;


        return (

            <Segment>
                {/* Time Series Chart */}
                <Header as='h2' content='Time Series Data' />
                <Divider />
                <FlexibleWidthXYPlot height={300}>
                    <LineMarkSeries data={timeSeriesGraphData.slice()} />
                    <XAxis />
                    <YAxis />
                </FlexibleWidthXYPlot>
            </Segment>


        )
    }
}