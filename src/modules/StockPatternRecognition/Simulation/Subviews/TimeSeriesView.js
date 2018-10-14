import * as React from 'react';
import { Header, Divider, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';

// Stores
import TimeSeriesStore from '../Stores/TimeSeriesStore';
import InputStore from '../Stores/InputStore';
import { Coordinate } from '../../../../models/Coordinate';


@observer
export default class TimeSeriesView extends React.Component {

    render() {

        const { attributes } = TimeSeriesStore;
        const { input } = InputStore;
        
        const meta = `${input.symbol}  -  ${attributes.startDate} at $${attributes.startPrice} to ${attributes.endDate} at $${attributes.endPrice}  -  ${attributes.numberDataPoints} points`;

        const timeseriesGraphData = TimeSeriesStore.data.map((data, index) => {
            return Coordinate(index, data.price);
        });

        return (
            <Segment className='bg-light'>

                <Header as='h2' content={meta} />

                <Segment>
                    <FlexibleWidthXYPlot height={300} >
                        <XAxis />
                        <YAxis />
                        <LineMarkSeries data={timeseriesGraphData} />
                    </FlexibleWidthXYPlot>
                </Segment>
            </Segment>
        )
    }
}