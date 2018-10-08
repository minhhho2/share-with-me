import * as React from 'react';
import { Card, Header, Grid, Divider, Form, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';


import MockPatterns from '../../constants/MockPatterns';
import * as utils from '../Stores/utils';

// Stores
import SamplingStore from '../Stores/SamplingStore';
import TimeSeriesStore from '../Stores/TimeSeriesStore';

import StockPatternApi from '../../../../api/StockPatternApi';

@observer
export default class SamplingView extends React.Component {

    componentDidMount() {
        SamplingStore.setup();
    }

    onPeriodChange = (e, data) => { SamplingStore.period = parseInt(data.value); }

    onSaveMatchedSamples = () => {
        const { matches } = SamplingStore;
        if (matches.length <= 0) {
            console.log('No matches found');
        } else {
            matches.forEach(pattern => {
                StockPatternApi.create(pattern)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            });
        }

    }

    onStartSampling = () => {
        console.log(SamplingStore.period);
        this.matches = [];
        SamplingStore.clear();
        SamplingStore.windowPos = 0;
        SamplingStore.intervalId = setInterval(this.timer, 5);
    }

    timer = () => {
        const { windowPos, period } = SamplingStore
        const { data } = TimeSeriesStore;

        // get the N object of date and prices

        const datas = data.slice(windowPos, windowPos + period);
        const prices = datas.map(data => { return data.price; });

        SamplingStore.setCurrentSampleValues(prices);   // set values for graph
        SamplingStore.classifySample(windowPos, prices);           // compare and classift
        SamplingStore.windowPos = windowPos + 1;        // increment samples

        // stop sampling
        if (SamplingStore.windowPos > (data.length - period)) {
            SamplingStore.clear();
        }
    }

    render() {

        const { currentSampleValues, windowPos, period, matches } = SamplingStore;
        const { data, attributes } = TimeSeriesStore;

        // Configure sliding window properties
        var windowData = [];
        for (var i = windowPos; i < windowPos + period; i++) {
            windowData.push({ x: i, y: 0 });
        }

        return (
            <Segment className='bg-light'>
                <Header as='h2' content='Sampling View' />
                <Divider />

                {/* Sampling Window Chart */}
                <Segment>
                    <Header as='h3' content='Sliding Window' />

                    <FlexibleWidthXYPlot height={100} xDomain={[0, data.length]}>
                        <XAxis />
                        <YAxis />
                        <LineMarkSeries data={windowData} />
                    </FlexibleWidthXYPlot>
                </Segment>

                {/* Stats and buttons */}
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input label='dates' value={`${attributes.startDate} to ${attributes.endDate}`} />
                        <Form.Input label='prices' value={`${attributes.startPrice} to ${attributes.endPrice}`} />
                        <Form.Input label='samples' value={`${attributes.numberDataPoints}`} />

                        <Form.Input
                            type='number' label='Period' name='period' fluid
                            value={period}
                            onChange={this.onPeriodChange}
                        />

                        <Form.Button fluid positive type='button' onClick={this.onStartSampling} content='Start Sampling' />
                        <Form.Button fluid negative type='button' onClick={SamplingStore.clear} content='Stop Sampling' />
                        <Form.Button fluid type='button' onClick={this.onSaveMatchedSamples} content='Save Samples' />
                    </Form.Group>
                </Form>


                {/* Current Sample nand Comparison Patterns */}
                <Segment>
                    <Grid>

                        {/* Current Sample */}
                        <Grid.Column width={4}>
                            <Header as='h3' content='Current Sample' />
                            <Card.Group itemsPerRow={1}>

                                <Card>
                                    <Card.Content>
                                        <Card.Header>Current Sample</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <FlexibleWidthXYPlot height={150}>
                                            <LineMarkSeries
                                                data={utils.createGraphDataFromArrayOfValues(currentSampleValues)}
                                                lineStyle={{ stroke: 'red' }}
                                                markStyle={{ stroke: 'blue' }}
                                            />
                                        </FlexibleWidthXYPlot>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>

                        {/* Defined Patterns  */}
                        <Grid.Column width={12}>
                            <Header as='h3' content='Defined Patterns' />
                            <Card.Group itemsPerRow={4}>

                                {MockPatterns.defined.slice().map((pattern, index) => {
                                    return (
                                        <Card key={index}>
                                            <Card.Content>
                                                <Card.Header>{pattern.name}</Card.Header>
                                            </Card.Content>
                                            <Card.Content>
                                                <FlexibleWidthXYPlot height={150} >
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
                    <Header as='h1' content='Sampled Match Stock Patterns' />

                    <Card.Group itemsPerRow={4}>
                        {matches.map((pattern, index) => {
                            return (
                                <Card className='' key={index}>
                                    <Card.Content>
                                        <Card.Header>{pattern.name}</Card.Header>
                                        <Card.Meta>{`Cost: ${pattern.cost.toFixed(2)}`}</Card.Meta>
                                        <Card.Meta>{`Symbol: ${pattern.symbol}`}</Card.Meta>
                                        <Card.Meta>{`Date: ${pattern.date}`}</Card.Meta>
                                        <Card.Meta>{`Period: ${pattern.period}`}</Card.Meta>
                                    </Card.Content>

                                    <Card.Content>
                                        <FlexibleWidthXYPlot height={200}>
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

                </Segment>
            </Segment>
        )
    }
}