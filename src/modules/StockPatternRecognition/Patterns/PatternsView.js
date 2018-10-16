import * as React from 'react';
import { Card, Button, Form, Header, Segment, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';



// Custom components
import SampleCardGraphContainer from '../Simulation/Subviews/SampleCardGraphContainer';

// Stores
import PatternsStore from './PatternsStore';

// Misc
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

        var promises = [];

        // Delete all existing patterns
        sampledPatterns.forEach(data => {
            promises.push(StockPatternApi.delete(data._id.$oid));
        });

        // Wait until all delete finishes 
        Promise.all(promises).then(() => {
            console.log(`Pruned all of ${sampledPatterns.length}`);

            // Create new patterns
            var nextPromises = PatternsStore.createPatterns();
            Promise.all(nextPromises).then(() => {
                PatternsStore.setup();
            });
        });
    }

    pruneSameValues = () => {
        const { sampledPatterns } = PatternsStore;

        var prunableId = [];

        for (var i = 0; i < sampledPatterns.length - 1; i++) {
            for (var j = i + 1; j < sampledPatterns.length; j++) {

                const a = sampledPatterns[i], b = sampledPatterns[j];

                const difference = utils.differenceArrays(a.values, b.values);

                if (a.name === b.name && a.values.length === b.values.length && difference <= 1) {
                    prunableId.push(a._id.$oid);
                    break;
                }
            }
        }

        var promises = [];

        prunableId.forEach(id => {
            promises.push(StockPatternApi.delete(id));
        });

        Promise.all(promises).then(_ => {
            console.log(`Pruned ${prunableId.length} from ${sampledPatterns.length}`);
            PatternsStore.setup();
        });
    }

    refresh = () => {
        PatternsStore.setup();
    }

    render() {

        const { definedPatterns, sampledPatterns, patternCounts, periodCounts } = PatternsStore;

        return (
            <div>

                {/* Defined stock patterns */}
                <Segment>
                    <Header as='h1' content='Defined Stock Patterns' />

                    <Card.Group itemsPerRow={6}>
                        {definedPatterns.map((pattern, index) => {
                            return (<SampleCardGraphContainer
                                key={index} title={pattern.name}
                                data={utils.createCoordinateData(pattern.values)}
                            />);
                        })}
                    </Card.Group>
                </Segment>

                <Segment>
                    <Grid>
                        <Grid.Column width={8}>
                            {/* Control Form */}

                            <Segment>

                                <Form>
                                    <Form.Group>
                                        <Form.Button fluid onClick={this.pruneAll} content='Prune All' />
                                        <Form.Button fluid onClick={this.pruneSameValues} content='Prune Same Values' />
                                        <Form.Button fluid onClick={this.refresh} content='Refresh' />
                                    </Form.Group>
                                </Form>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            {/* Statistics */}
                            <Segment>
                                <Header as='h1' content='Dataset Statistics' />
                                <Grid columns='equal'>

                                    <Grid.Column>
                                        <p>{`small: ${PatternsStore.small}`}</p>
                                        <p>{`medium: ${PatternsStore.med}`}</p>
                                        <p>{`large: ${PatternsStore.large}`}</p>
                                    </Grid.Column>

                                    <Grid.Column>
                                        {Object.keys(patternCounts).forEach(key => {
                                            return (
                                                <p key={key}>
                                                    {key + ': ' + patternCounts[key]}
                                                </p>
                                            )
                                        })}
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Grid.Column>

                    </Grid>

                </Segment>



                {/* Samples */}
                <Segment>
                    <Header as='h1' content='Current Dataset for kNN Classifier' />
                    <Card.Group itemsPerRow={6}>
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
                                            <XAxis />
                                            <YAxis />
                                            <LineMarkSeries
                                                data={utils.createCoordinateData(pattern.values)}
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
            </div>
        )
    }
}