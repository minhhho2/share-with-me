import * as React from 'react';
import { Card, Header, Grid, Form, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';

import _ from 'lodash';

import MockPatterns from '../../constants/MockPatterns';
import * as utils from '../Stores/utils';

// Stores
import SamplingStore from '../Stores/SamplingStore';
import TimeSeriesStore from '../Stores/TimeSeriesStore';
import InputStore from '../Stores/InputStore';

import StockPatternApi from '../../../../api/StockPatternApi';
import SlidingWindowContainer from './SlidingWindowContainer';
import SampleCardGraphContainer from './SampleCardGraphContainer';

import { StockPattern } from '../../../../models/StockPattern';

@observer
export default class SamplingView extends React.Component {

    componentWillMount() { SamplingStore.setup(); }

    onPeriodChange = (e, data) => {
        SamplingStore.period = parseInt(data.value);
        SamplingStore.minDaysApart = parseInt(SamplingStore.peirod / 10.0 * 3.0);
        SamplingStore.currentSampleValues = _.range(SamplingStore.period);
    }

    onSaveMatchedSamples = () => {        // Add new labeled patterns to database
        SamplingStore.matches.forEach(pattern => {
            StockPatternApi.create(pattern)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        });
    }

    onStopSampling = () => {
        SamplingStore.clear();
    }

    onStartSampling = () => {
        this.matches = [];

        // Sets periods to check
        SamplingStore.getPeriodGroups(InputStore.input.period);


        console.log(`Period selected is ${InputStore.input.period} `);
        console.log(`Periods to process is  ${SamplingStore.timeseriesLengthsToCheck}`);

        // Set period
        SamplingStore.period = SamplingStore.timeseriesLengthsToCheck.pop();
        SamplingStore.setMinDaysApart(SamplingStore.period);

        // Start processing
        SamplingStore.intervalId = setInterval(this.timer, 5);
    }

    timer = () => {
        const { windowPos, period } = SamplingStore
        const { data } = TimeSeriesStore;
        const { input } = InputStore;

        // get the N object of date and prices
        const prices = data.slice(windowPos, windowPos + period).map(elem => { return elem.price; });

        SamplingStore.setCurrentSampleValues(prices);   // set values for graph

        const sample = StockPattern(
            undefined, undefined, prices,
            TimeSeriesStore.data[windowPos].date,
            period + '|' + input.period, input.symbol
        );
        


        SamplingStore.classifySample(sample);           // compare and classift
        SamplingStore.windowPos = windowPos + 1;        // increment samples

        // Finish one period so move to next or stop processing
        if (SamplingStore.windowPos > (data.length - period)) {

            // Move onto next period if there is one
            if (SamplingStore.timeseriesLengthsToCheck.length > 0) {
                SamplingStore.windowPos = 0;
                SamplingStore.period = SamplingStore.timeseriesLengthsToCheck.pop();
                SamplingStore.setMinDaysApart(SamplingStore.period);
            
                // Stop timer if no period left
            } else {
                SamplingStore.clear();
            }
        }
    }

    render() {

        const { currentSampleValues, windowPos, period, matches } = SamplingStore;
        const { data } = TimeSeriesStore;

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
                            <Form>
                                <Form.Input fluid placeholder={'Select a period'} type='number' name='period' value={period} onChange={this.onPeriodChange} />
                                <Form.Button fluid positive type='button' onClick={this.onStartSampling} content='Start' />
                                <Form.Button fluid negative type='button' onClick={this.onStopSampling} content='Stop' />
                                <Form.Button fluid type='button' onClick={this.onSaveMatchedSamples} content='Save' />
                            </Form>
                        </Grid.Column>

                        {/* Current Sample */}
                        <Grid.Column width={4}>
                            <Card.Group itemsPerRow={1}>
                                <SampleCardGraphContainer
                                    title={'Current Sample'}
                                    data={utils.createCoordinateData(currentSampleValues)}
                                />
                            </Card.Group>
                        </Grid.Column>

                        {/* Defined Patterns  */}
                        <Grid.Column width={10}>
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