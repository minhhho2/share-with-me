import * as React from 'react';
import { Card, Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import SimulationStore from '../SimulationStore';
import MockPatterns from '../../constants/MockPatterns';
import { FlexibleWidthXYPlot, XYPlot, LineMarkSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from 'react-vis';

@observer
export default class SamplingView extends React.Component {

    process = (values) => {
        var data = values.map((value, index) => {
            return {
                x: index,
                y: value
            }
        });

        return data;
    }

    render() {


        const { timeSeriesData, windowPos, period, timeSeriesAttributes } = SimulationStore;

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
                    <Header as='h3' content='Sampling Window' />

                    <FlexibleWidthXYPlot height={100} xDomain={xWindowDomain}>
                        <LineMarkSeries data={windowData} />
                        <XAxis />
                        <YAxis />
                    </FlexibleWidthXYPlot>
                </Segment>

                <Segment>
                    <Header as='h3' content='Sample and Patterns' />
                    <Grid>
                        <Grid.Column width={4}>
                            <XYPlot height={200} width={250}>
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]}
                                    lineStyle={{ stroke: 'red' }}
                                    markStyle={{ stroke: 'blue' }}
                                />
                            </XYPlot>
                        </Grid.Column>

                        <Grid.Column width={12}>
                            <Card.Group itemsPerRow={4}>


                                {MockPatterns.defined.slice().map((pattern, index) => {
                                    return (
                                        <Card className='' key={index}>

                                            <Card.Content>
                                                <Card.Header>{pattern.name}</Card.Header>
                                            </Card.Content>

                                            <Card.Content>
                                                <Card.Meta>distance/cost</Card.Meta>
                                                <Card.Meta>dist from epsilon</Card.Meta>
                                            </Card.Content>

                                            <Card.Content>
                                                <XYPlot height={200} width={250}>
                                                    <VerticalGridLines />
                                                    <HorizontalGridLines />
                                                    <XAxis />
                                                    <YAxis />
                                                    <LineMarkSeries
                                                        data={this.process(pattern.values)}
                                                        lineStyle={{ stroke: 'red' }}
                                                        markStyle={{ stroke: 'blue' }}
                                                    />
                                                </XYPlot>
                                            </Card.Content>
                                        </Card>

                                    );
                                })}
                            </Card.Group>
                        </Grid.Column>
                    </Grid>
                </Segment>

            </Segment>
        )
    }
}