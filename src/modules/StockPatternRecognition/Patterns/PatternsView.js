import * as React from 'react';
import { Card, Button, Form, Header, Segment, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import {
    FlexibleWidthXYPlot, LineMarkSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis
} from 'react-vis';

import _ from 'lodash';

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
    pruneAll = () => {
        const { sampledPatterns } = PatternsStore;

        sampledPatterns.forEach(data => {
            StockPatternApi.delete(data._id.$oid);
        });

        console.log(`Pruned all of ${sampledPatterns.length}`);
        PatternsStore.setup();
    }

    pruneAllCriterias = () => {
        this.pruneSameValues();
        this.pruneWorstValues();
    }


    pruneSameValues = () => {
        const { sampledPatterns } = PatternsStore;

        var prunableId = [];

        for (var i = 0; i < sampledPatterns.length - 1; i++) {
            for (var j = i + 1; j < sampledPatterns.length; j++) {
                const a = sampledPatterns[i];
                const b = sampledPatterns[j];

                const difference = Math.abs(_.sum(a.values) - _.sum(b.values));

                if (a.name === b.name && difference <= 1 && a.values.length === b.values.length) {
                    prunableId.push(a._id.$oid);
                    break;
                }
            }
        }
        console.log(`Pruned ${prunableId.length} from ${sampledPatterns.length}`);

        prunableId.forEach(id => {
            StockPatternApi.delete(id);
        });

        PatternsStore.setup();
    }

    pruneWorstValues = () => {

        var newData = PatternsStore.sampledPatterns.slice();

        newData.sort((a, b) => {
            return b.cost - a.cost;
        });

        const numPrune = parseInt(newData.length * 0.20);

        if ((newData.length - numPrune) >= 4) {

            // get the worst cost ones
            var worstCost = newData.slice(0, numPrune);

            console.log(`Pruned ${numPrune} from ${newData.length}`);

            worstCost.forEach(data => {
                StockPatternApi.delete(data._id.$oid);
            });
        }
        PatternsStore.setup();

    }

    pruneSimilarDates = () => {
        // Prune patterns that have similar dates, same name and values
    }
    refresh = () => {
        PatternsStore.computeStats();
    }

    render() {

        const { definedPatterns, sampledPatterns, patternCounts, periodCounts } = PatternsStore;

        return (
            <div>

                <Segment>
                    <Header as='h1' content='Defined Stock Patterns' />


                    <Card.Group itemsPerRow={8}>
                        {definedPatterns.map((pattern, index) => {
                            return (
                                <Card key={index}>

                                    <Card.Content>
                                        <Card.Header>{pattern.name}</Card.Header>
                                    </Card.Content>

                                    <Card.Content>
                                        <Card.Meta>{`Cost: ${pattern.cost}`}</Card.Meta>
                                    </Card.Content>

                                    <Card.Content>
                                        <FlexibleWidthXYPlot height={200}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
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

                {/* Control Form */}
                <Segment>
                    <Form>
                        <Form.Group>
                            <Form.Button fluid onClick={this.pruneAll} content='Prune All' />
                            <Form.Button fluid onClick={this.pruneAllCriterias} content='Prune All Criterias' />
                            <Form.Button fluid onClick={this.pruneSameValues} content='Prune Same Values' />
                            <Form.Button fluid onClick={this.pruneWorstValues} content='Prune Worst Values' />
                            <Form.Button fluid onClick={this.refresh} content='Refresh' />
                        </Form.Group>
                    </Form>
                </Segment>

                {/* Statistics */}
                <Segment>
                    <Header as='h1' content='Dataset Statistics' />
                    <Grid columns='equal'>
                        <Grid.Column>
                            {patternCounts.map(pattern => {
                                return (<p key={pattern.name}>{`${pattern.name} with ${pattern.count}`}</p>);
                            })}
                        </Grid.Column>

                        <Grid.Column>
                            {periodCounts.map((pattern, index) => {
                                return (<p key={index}>{`${pattern.name} days with ${pattern.count}`}</p>);
                            })}
                        </Grid.Column>
                    </Grid>



                </Segment>

                {/* Samples */}
                <Segment>
                    <Header as='h1' content='Sampled Match Stock Patterns' />

                    <Card.Group itemsPerRow={8}>

                        {sampledPatterns.map((pattern) => {
                            return (
                                <Card className='' key={pattern._id.$oid}>

                                    <Card.Content>
                                        <Card.Header>{pattern.name}</Card.Header>
                                    </Card.Content>

                                    <Card.Content>
                                        <Card.Meta>{`Cost: ${pattern.cost.toFixed(2)}`}</Card.Meta>
                                        <Card.Meta>{`Symbol: ${pattern.symbol}`}</Card.Meta>
                                        <Card.Meta>{`Date: ${pattern.date}`}</Card.Meta>
                                        <Card.Meta>{`Period: ${pattern.period}`}</Card.Meta>
                                    </Card.Content>

                                    <Card.Content>
                                        <FlexibleWidthXYPlot height={200}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
                                            <XAxis />
                                            <YAxis />
                                            <LineMarkSeries
                                                data={utils.createGraphDataFromArrayOfValues(pattern.values)}
                                                lineStyle={{ stroke: 'red' }}
                                                markStyle={{ stroke: 'blue' }}
                                            />
                                        </FlexibleWidthXYPlot>
                                    </Card.Content>

                                    <Card.Content>
                                        <Button id={pattern._id.$oid} content='delete' fluid negative onClick={this.onDelete} />
                                    </Card.Content>
                                </Card>

                            );
                        })}
                    </Card.Group>
                </Segment>


                <Segment>
                    <p>more pattern observation in lower periods BUT more false positive -> patterns is not easily distinguished, </p>
                    <p>less pattern observation in higher periods BUT more true positive -> patterns are a lot more recognizable </p>
                    <p>incremental learning gives more labels BUT new labels become less distinguishable -> need to reduce threshold </p>
                    <p>Little patterns in non-volatile stocks</p>
                    <p>Patterns with alot of maximas and minimas are detected more in short term due to stock osciliation and cost function </p>
                    <p>Pattenrs with less min/maximas are detected more accurately</p>
                    <p> Adding slanted patterns -> more observations in long term -> more incorrect observations in short term</p>

                    <p>Longer periods could detect substantially more patterns after using incremental learning acorss multiple stock rpices</p>
                </Segment>
            </div>
        )
    }
}