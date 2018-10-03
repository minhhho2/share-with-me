import * as React from 'react';
import { Grid, Card, Button, Header, Form, Segment, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import PatternsStore from './PatternsStore';
import { XYPlot, LineMarkSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from 'react-vis';



@observer
export default class PatternsView extends React.Component {



    process = (values) => {
        var data = values.map((value, index) => {
            return {
                x: index,
                y: value
            }
        });

        return data;

    }

    onDelete = (e) => {}




    render() {



        const { definedPatterns } = PatternsStore;

        return (
            <div>

                <Segment>
                    <Header as='h1' content='Defined Stock Patterns' />


                    <Card.Group itemsPerRow={4}>


                        {definedPatterns.map((pattern, index) => {
                            return (
                                <Card className='text-center' key={index}>
                                    <Card.Content>
                                        <Card.Header>{pattern.name}</Card.Header>
                                        <Button content='delete' fluid negative />
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Meta>distance/cost | dist from epsilon </Card.Meta>
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



                </Segment>
                <Segment>
                    <Header as='h1' content='Sampled Match Stock Patterns' />
                </Segment>
            </div>
        )
    }
}