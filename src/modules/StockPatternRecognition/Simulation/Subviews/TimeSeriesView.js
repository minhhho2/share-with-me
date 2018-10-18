import * as React from 'react';
import { Header, Form, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';

// Stores
import TimeSeriesStore from '../Stores/TimeSeriesStore';
import InputStore from '../Stores/InputStore';
import { Coordinate } from '../../../../models/Coordinate';

@observer
export default class TimeSeriesView extends React.Component {

    componentDidMount() {
        TimeSeriesStore.setup();
    }

    onIndexChange = (e, data) => { TimeSeriesStore.updateIndexRangeKeyValue(data.name, data.value); }

    render() {

        const { attributes, indexRange, data } = TimeSeriesStore;
        const { input } = InputStore;

        const meta = `${input.symbol}  -  ${attributes.startDate} at $${attributes.startPrice} to ${attributes.endDate} at $${attributes.endPrice}  -  ${attributes.numberDataPoints} points`;

        var timeseriesGraphData = data.map((data, index) => {
            return Coordinate(index, data.price);
        });


        timeseriesGraphData = timeseriesGraphData.slice(indexRange.start, indexRange.end);
        var series = timeseriesGraphData.map(value => {
            return value.y;
        })

        return (
            <Segment className='bg-light'>

                <Header as='h2' content={meta} />

                
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid type='number' name='start' min={0} value={indexRange.start} onChange={this.onIndexChange}/>
                        <Form.Input fluid type='number' name='end' max={data.length - 1} value={indexRange.end} onChange={this.onIndexChange}/>
                    </Form.Group>
                </Form>
                

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