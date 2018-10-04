import * as React from 'react';
import { Card, Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import SimulationStore from '../SimulationStore';
import SamplingStore from '../Stores/SamplingStore';

import MockPatterns from '../../constants/MockPatterns';
import {
    FlexibleWidthXYPlot, XYPlot, LineMarkSeries,
    HorizontalGridLines, VerticalGridLines, XAxis, YAxis
} from 'react-vis';

import * as utils from '../Stores/utils';

@observer
export default class SamplingView extends React.Component {

    /* 
    TODO LIST
        // Read sampled patterns from db
    // Compare sample to patterns
    // on matches: create pattern
        // add to local array
        // add to DB
    */

    render() {


        const { timeSeriesData, windowPos, period } = SimulationStore;
        const { currentSampleValues } = SamplingStore;

        // Configure sliding window properties
        var windowData = [];
        for (var i = windowPos; i < windowPos + period; i++) {
            windowData.push({ x: i, y: 0 });
        }

        const xWindowDomain = [0, timeSeriesData.length];




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