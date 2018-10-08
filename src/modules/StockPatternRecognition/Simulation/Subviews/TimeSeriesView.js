import * as React from 'react';
import { Header, Divider, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import {
    FlexibleWidthXYPlot, LineMarkSeries,
    XAxis, YAxis, VerticalGridLines, HorizontalGridLines
} from 'react-vis';

// Stores
import TimeSeriesStore from '../Stores/TimeSeriesStore';
import InputStore from '../Stores/InputStore';
import { Coordinate } from '../../../../models/Coordinate';


@observer
export default class TimeSeriesView extends React.Component {

    render() {

        const { attributes } = TimeSeriesStore;
        
        const metaOne = `${attributes.numberDataPoints} data points for $${attributes.startPrice} $to ${attributes.endPrice}`
        const metaTwo = `Time series prices from ${attributes.startDate} to ${attributes.endDate}`;

        // Create {x: ..., y: ...} array for time series graph
        const timeseriesGraphData = TimeSeriesStore.data.map((data, index) => {
            return Coordinate(index, data.price);
        });

        return (
            <Segment className='bg-light'>
                
                <Header as='h2' content={`${InputStore.input.symbol}`} />
                <p>{metaOne}</p>
                <p>{metaTwo}</p>
                <Divider />

                <Segment>
                    <FlexibleWidthXYPlot height={300} >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <LineMarkSeries data={timeseriesGraphData} />
                    </FlexibleWidthXYPlot>
                </Segment>
            </Segment>
        )
    }
}