import * as React from 'react';
import { Card, Header, Grid, Divider, Form, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';


import MockPatterns from '../../constants/MockPatterns';
import * as utils from '../Stores/utils';

// Stores
import SamplingStore from '../Stores/SamplingStore';
import TimeSeriesStore from '../Stores/TimeSeriesStore';


@observer
export default class SamplingView extends React.Component {

    componentDidMount() {
        SamplingStore.setup();
    }

    onStartSampling = () => {
        SamplingStore.clear();
        SamplingStore.intervalId = setInterval(this.timer, 200);
    }

    timer = () => {
        const { windowPos, period } = SamplingStore
        const { data } = TimeSeriesStore;

        // get the N object of date and prices
        const datas = data.slice(windowPos, windowPos + period);
        const prices = datas.map(data => { return parseFloat(data.price); });

        SamplingStore.setCurrentSampleValues(prices);   // set values for graph
        SamplingStore.classifySample(prices);           // compare and classift
        SamplingStore.windowPos = windowPos + 1;      // increment samples

        // stop sampling
        if (SamplingStore.windowPos > (data.length - period)) {
            SamplingStore.clear();
        }
    }

    render() {

        const { currentSampleValues, windowPos, period } = SamplingStore;
        const { data, attributes } = TimeSeriesStore;

        // Configure sliding window properties
        var windowData = [];
        for (var i = windowPos; i < windowPos + period; i++) {
            windowData.push({ x: i, y: 0 });
        }

        const xWindowDomain = [0, data.length];

        return (
            <Segment>
                <Header as='h2' content='Sampling View' />
                <Divider />

                {/* Sampling Window Chart */}
                <Segment>
                    <Header as='h3' content='Sliding Window' />
                    <FlexibleWidthXYPlot height={100} xDomain={xWindowDomain}>
                        <LineMarkSeries data={windowData} />
                        <XAxis />
                        <YAxis />
                    </FlexibleWidthXYPlot>
                </Segment>

                {/* Stats and buttons */}
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input value={`Dates: ${attributes.startDate} to ${attributes.endDate}`} />
                        <Form.Input value={`PriceS: ${attributes.startPrice} to ${attributes.endPrice}`} />
                        <Form.Input value={`Points: ${attributes.numberDataPoints}`} />
                        <Form.Button fluid type='button' onClick={this.onStartSampling} content='Start Sampling' />
                        <Form.Button fluid type='button' onClick={SamplingStore.clear} content='Stop Sampling' />
                    </Form.Group>
                </Form>


                {/* Current Sample nand Comparison Patterns */}
                <Segment>
                    <Grid>

                        {/* Current Sample */}
                        <Grid.Column width={4}>
                            <Header as='h3' content='Current Sample' />
                            <Card>
                                <Card.Content><Card.Header>Current Sample</Card.Header></Card.Content>
                                <Card.Content>
                                    <FlexibleWidthXYPlot height={150}>
                                        <XAxis />
                                        <YAxis />
                                        <LineMarkSeries
                                            data={utils.createGraphDataFromArrayOfValues(currentSampleValues)}
                                            lineStyle={{ stroke: 'red' }}
                                            markStyle={{ stroke: 'blue' }}
                                        />
                                    </FlexibleWidthXYPlot>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                        {/* Defined Patterns  */}
                        <Grid.Column width={12}>
                            <Header as='h3' content='Patterns' />
                            <Card.Group itemsPerRow={4}>

                                {MockPatterns.defined.slice().map((pattern, index) => {
                                    return (
                                        <Card className='' key={index}>
                                            <Card.Content><Card.Header>{pattern.name}</Card.Header></Card.Content>
                                            <Card.Content>
                                                <FlexibleWidthXYPlot height={150} >
                                                    <XAxis />
                                                    <YAxis />
                                                    <LineMarkSeries
                                                        data={utils.createGraphDataFromArrayOfValues(pattern.values)}
                                                        lineStyle={{ stroke: 'red' }}
                                                        markStyle={{ stroke: 'blue' }}
                                                    />
                                                </FlexibleWidthXYPlot>
                                            </Card.Content>
                                        </Card>
                                    );
                                })}

                            </Card.Group>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Segment>
                    <Header as='h3' content='Matched Samples' />


                </Segment>

            </Segment>
        )
    }
}