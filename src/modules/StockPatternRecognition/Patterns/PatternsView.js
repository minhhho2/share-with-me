import * as React from 'react';
import { Grid, Card, Button, Header, Form, Segment, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import PatternsStore from './PatternsStore';
import { XYPlot, LineMarkSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis } from 'react-vis';

@observer
export default class PatternsView extends React.Component {


    componentDidMount() {
        PatternsStore.setup();
    }

    process = (values) => {
        var data = values.map((value, index) => {
            return {
                x: index,
                y: value
            }
        });

        return data;

    }

    onDelete = (e) => {
        console.log(e.target.id + 'is clicked');
        var newSampledPatterns = PatternsStore.sampledPatterns.filter(pattern => {
            return pattern.id !== parseInt(e.target.id);
        });

        PatternsStore.sampledPatterns = newSampledPatterns.slice();
    }




    render() {



        const { definedPatterns, sampledPatterns } = PatternsStore;

        return (
            <div>

                <Segment>
                    <Header as='h1' content='Defined Stock Patterns' />


                    <Card.Group itemsPerRow={4}>


                        {definedPatterns.map((pattern, index) => {
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



                </Segment>
                <Segment>
                    <Header as='h1' content='Sampled Match Stock Patterns' />

                    <Card.Group itemsPerRow={4}>

                        {sampledPatterns.map((pattern, index) => {
                            return (
                                <Card className='' key={index}>

                                    <Card.Content>
                                        <Card.Header>{pattern.name}</Card.Header>
                                    </Card.Content>

                                    <Card.Content>
                                        <Card.Meta>distance/cost: {pattern.dist}</Card.Meta>
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

                                    <Card.Content>
                                        <Button id={pattern.id} content='delete' fluid negative onClick={this.onDelete} />
                                    </Card.Content>
                                </Card>

                            );
                        })}
                    </Card.Group>



                </Segment>
            </div>
        )
    }
}