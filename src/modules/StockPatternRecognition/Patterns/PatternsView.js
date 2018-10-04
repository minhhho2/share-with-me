import * as React from 'react';
import { Card, Button, Header, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import {
    XYPlot, LineMarkSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis
} from 'react-vis';


import PatternsStore from './PatternsStore';
import StockPatternApi from '../../../api/StockPatternApi';
import * as utils from '../Simulation/Stores/utils';

@observer
export default class PatternsView extends React.Component {


    componentDidMount() {
        PatternsStore.setup();
    }

    onDelete = (e) => {
        var newSampledPatterns = PatternsStore.sampledPatterns.filter(pattern => {
            return pattern._id.$oid !== e.target.id;
        });

        StockPatternApi.delete(e.target.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        PatternsStore.sampledPatterns = newSampledPatterns.slice();
    }

    render() {



        const { definedPatterns, sampledPatterns } = PatternsStore;

        return (
            <div>

                <Segment>
                    <Header as='h1' content='Defined Stock Patterns' />


                    <Card.Group itemsPerRow={6}>


                        {definedPatterns.map((pattern, index) => {
                            return (
                                <Card key={index}>

                                    <Card.Content>
                                        <Card.Header>{pattern.name}</Card.Header>
                                    </Card.Content>

                                    <Card.Content>
                                        <Card.Meta>dist/cost</Card.Meta>
                                        <Card.Meta>dist from epsilon</Card.Meta>
                                    </Card.Content>

                                    <Card.Content>
                                        <XYPlot height={200} width={250}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
                                            <XAxis />
                                            <YAxis />
                                            <LineMarkSeries
                                                data={utils.createGraphDataFromArrayOfValues(pattern.values)}
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

                        {sampledPatterns.map((pattern) => {
                            return (
                                <Card className='' key={pattern._id.$oid}>

                                    <Card.Content>
                                        <Card.Header>{pattern.name}</Card.Header>
                                    </Card.Content>

                                    <Card.Content>
                                        <Card.Meta>dis for sample and pattern: {pattern.cost}</Card.Meta>
                                        <Card.Meta>difference between dis and epsilon: {pattern.cost}</Card.Meta>
                                        <Card.Meta>average dis for same sampled pattern: {pattern.cost}</Card.Meta>
                                    </Card.Content>

                                    <Card.Content>
                                        <XYPlot height={200} width={250}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
                                            <XAxis />
                                            <YAxis />
                                            <LineMarkSeries
                                            data={utils.createGraphDataFromArrayOfValues(pattern.values)}
                                                lineStyle={{ stroke: 'red' }}
                                                markStyle={{ stroke: 'blue' }}
                                            />
                                        </XYPlot>
                                    </Card.Content>

                                    <Card.Content>
                                        <Button id={pattern._id.$oid} content='delete' fluid negative onClick={this.onDelete} />
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