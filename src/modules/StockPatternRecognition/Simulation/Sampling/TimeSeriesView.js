import * as React from 'react';
import { Header, Divider, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import {
    FlexibleWidthXYPlot, 
    LineMarkSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines
} from 'react-vis';

import TimeSeriesStore from '../Stores/TimeSeriesStore';


@observer
export default class TimeSeriesView extends React.Component {

    render() {
        
        const stockTimeSeries = TimeSeriesStore.data.map((data, index) => {
            return { x: index, y: data.price }
        });

        return (

            <Segment>

                {/* Time Series Chart */}
                <Header as='h2' content='Time Series Data' />
                <Divider />
                <FlexibleWidthXYPlot height={300} >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineMarkSeries data={stockTimeSeries} />
                </FlexibleWidthXYPlot>
                
            </Segment>


        )
    }
}