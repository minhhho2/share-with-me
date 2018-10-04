import * as React from 'react';
import { Header, Divider, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import {
    FlexibleWidthXYPlot,
    LineMarkSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines
} from 'react-vis';

import TimeSeriesStore from '../Stores/TimeSeriesStore';
import InputStore from '../Stores/InputStore';


@observer
export default class TimeSeriesView extends React.Component {

    render() {

        const stockTimeSeries = TimeSeriesStore.data.map((data, index) => {
            return { x: index, y: data.price }
        });

        return (

            <Segment className='bg-light'>

                {/* Time Series Chart */}
                <Header as='h2' content={`Time Series Data for ${InputStore.input.symbol}`} />
                <Divider />
                <Segment>
                    <FlexibleWidthXYPlot height={300} >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <LineMarkSeries data={stockTimeSeries} />
                    </FlexibleWidthXYPlot>
                </Segment>

            </Segment>


        )
    }
}