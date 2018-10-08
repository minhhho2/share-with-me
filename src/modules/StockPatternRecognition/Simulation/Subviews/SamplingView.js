import * as React from 'react';
import { Card, Header, Grid, Divider, Form, Segment, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';


import MockPatterns from '../../constants/MockPatterns';
import * as utils from '../Stores/utils';

// Stores
import SamplingStore from '../Stores/SamplingStore';
import TimeSeriesStore from '../Stores/TimeSeriesStore';

import StockPatternApi from '../../../../api/StockPatternApi';
import SlidingWindowContainer from './SlidingWindowContainer';
import SampleCardGraphContainer from './SampleCardGraphContainer';

@observer
export default class SamplingView extends React.Component {

    componentWillMount() { SamplingStore.setup(); }

    onPeriodChange = (e, data) => { SamplingStore.period = parseInt(data.value); }

    onSaveMatchedSamples = () => {
        const { matches } = SamplingStore;

        // Error checking
        if (matches.length <= 0) {
            alert('Saving labelled sample patterns but none found!');
            return;
        }

        // Add new labeled patterns to database
        matches.forEach(pattern => {
            StockPatternApi.create(pattern)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        });

    }

    onStopSampling = () => {
        SamplingStore.clear();
    }

    onStartSampling = () => {
        if (SamplingStore.patterns.length <= 1) {
            console.log('Error @ SamplingView.js: Starting sampling but dataset is empty');
        }

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
        const { data } = TimeSeriesStore;

        // Configure sliding window properties
        var windowData = [];
        for (var i = windowPos; i < windowPos + period; i++) {
            windowData.push({ x: i, y: 0 });
        }

        return (
            <Segment className='bg-light'>

                {/* Sampling Window Chart */}
                <SlidingWindowContainer data={windowData} length={data.length} />

                <Segment>
                    <Grid>

                        {/* Stats and buttons */}
                        <Grid.Column width={2}>
                            <Header as='h3' content='Control Form' />
                            <Form>
                                <Form.Input type='number' label='Period' name='period' fluid value={period} onChange={this.onPeriodChange} />
                                <Form.Button fluid positive type='button' onClick={this.onStartSampling} content='Start' />
                                <Form.Button fluid negative type='button' onClick={this.onStopSampling} content='Stop' />
                                <Form.Button fluid type='button' onClick={this.onSaveMatchedSamples} content='Save' />
                            </Form>
                        </Grid.Column>

                        {/* Current Sample */}
                        <Grid.Column width={4}>
                            <Header as='h3' content='Current Sample' />
                            <Card.Group itemsPerRow={1}>
                                <SampleCardGraphContainer
                                    title={'Current Sample'}
                                    data={utils.createCoordinateData(currentSampleValues)}
                                />
                            </Card.Group>
                        </Grid.Column>

                        {/* Defined Patterns  */}
                        <Grid.Column width={10}>
                            <Header as='h3' content='Defined Patterns' />
                            <Card.Group itemsPerRow={4}>
                                {MockPatterns.defined.slice().map((pattern, index) => {
                                    return (
                                        <SampleCardGraphContainer
                                            key={index} title={pattern.name}
                                            data={utils.createCoordinateData(pattern.values)}
                                        />
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
                                                data={utils.createCoordinateData(pattern.values)}
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