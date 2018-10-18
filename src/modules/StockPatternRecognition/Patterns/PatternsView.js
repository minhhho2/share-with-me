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
import * as Utils from '../Helper/Utils';

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
            PatternsStore.reset();

            var promises2 = PatternsStore.createPatterns();
            Promise.all(promises2).then(() => {
                PatternsStore.getDataset();
            });
        });
    }



    pruneSameValues = () => {
        const { sampledPatterns } = PatternsStore;

        var prunableId = [];

        for (var i = 0; i < sampledPatterns.length - 1; i++) {
            for (var j = i + 1; j < sampledPatterns.length; j++) {

                const a = sampledPatterns[i], b = sampledPatterns[j];

                const difference = Utils.differenceArrays(a.rawValues, b.rawValues);

                if (a.name === b.name && a.rawValues.length === b.rawValues.length && difference <= 1) {
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

    refresh = () => { PatternsStore.getDataset(); }

    getDateString = (date) => { return new Date(date).toDateString(); }

    render() {

        const { definedPatterns, sampledPatterns } = PatternsStore;

        return (
            <div>

                <Segment>
                    <Grid>
                        <Grid.Column width={10}>
                            <Card.Group itemsPerRow={4}>
                                {definedPatterns.map((pattern, index) => {
                                    return (<SampleCardGraphContainer
                                        key={index} title={pattern.name}
                                        data={Utils.createCoordinateData(pattern.rawValues)}
                                    />);
                                })}
                            </Card.Group>
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <Form>
                                <Form.Button fluid onClick={this.pruneAll} content='Prune All' />
                                <Form.Button fluid onClick={this.pruneSameValues} content='Prune Same Values' />
                                <Form.Button fluid onClick={this.refresh} content='Refresh' />
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Segment>
                    <Header as='h1' content='Training Set used to learn a model through kNN Classifier Algorithm' />
                    <Card.Group itemsPerRow={6}>
                        {sampledPatterns.map((pattern) => {
                            return (
                                <Card className='' key={pattern._id.$oid}>

                                    <Card.Content><Card.Header>{pattern.name}</Card.Header></Card.Content>
                                    <Card.Content>
                                        <Card.Meta>{`Distance: ${pattern.distance} - - Symbol: ${pattern.symbol}`}</Card.Meta>
                                        <Card.Meta>{`Date: ${this.getDateString(pattern.date)} - - Period: ${pattern.period}`}</Card.Meta>
                                    </Card.Content>

                                    <Card.Content>
                                        <FlexibleWidthXYPlot height={200}>
                                            <XAxis />
                                            <YAxis />
                                            <LineMarkSeries
                                                data={Utils.createCoordinateData(pattern.rawValues)}
                                                lineStyle={{ stroke: 'red' }}
                                                markStyle={{ stroke: 'blue' }}
                                            />
                                        </FlexibleWidthXYPlot>
                                    </Card.Content>

                                    <Card.Content>
                                        <FlexibleWidthXYPlot height={200}>
                                            <XAxis />
                                            <YAxis />
                                            <LineMarkSeries
                                                data={Utils.createCoordinateData(pattern.parsedValues)}
                                                lineStyle={{ stroke: 'red' }}
                                                markStyle={{ stroke: 'blue' }}
                                            />
                                            <LineMarkSeries
                                                data={Utils.createCoordinateData(pattern.matchedPatternValues)}
                                                lineStyle={{ stroke: 'green' }}
                                                markStyle={{ stroke: 'yellow' }}
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


/* 

<Segment>
                                <Header as='h1' content='Dataset Statistics' />
                                <Grid columns='equal'>

                                    <Grid.Column>
                                        <p>{`X < 3 M: ${PatternsStore.small}`}</p>
                                        <p>{`3 M <= X <= 12 M: ${PatternsStore.med}`}</p>
                                        <p>{`12 M > X: ${PatternsStore.large}`}</p>
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
*/