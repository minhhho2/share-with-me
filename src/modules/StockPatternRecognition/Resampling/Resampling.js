import * as React from 'react';
import { observer } from 'mobx-react';
import { Grid, Segment, Header } from 'semantic-ui-react'

import {
    FlexibleWidthXYPlot, LineMarkSeries,
    XAxis, YAxis
} from 'react-vis';

import * as utils from '../Simulation/Stores/utils';
import _ from 'lodash';


@observer
export default class ResamplingView extends React.Component {

    render() {
        var patternSeries = utils.normalize([0, 50, 100, 150, 200, 150, 100, 50, 0, 50, 100, 150, 200, 150, 100, 50, 0]);
        var samplePatternSeries = utils.normalize([
            7.321, 7.2734, 7.0229, 7.3401, 7.1488, 7.5403, 7.6639, 7.7182, 7.9629,
            7.8534, 8.1008, 8.0074, 7.9989, 7.8962, 7.9576, 7.8739, 7.7863, 7.7405,
            7.7671, 7.8517, 7.9184, 7.9371, 8.1991, 8.301, 8.309, 8.3855, 8.3855, 8.0741,
            7.9406, 7.9985, 7.9184, 7.2734, 7.0229, 7.3401, 7.1488, 7.5403, 7.6639, 7.7182,
            7.9629, 7.8534, 8.1008, 8.0074, 7.9989, 7.8962, 7.9576, 7.8739, 7.7863, 7.7405,
            7.7671, 7.8517, 7.9184, 7.9371, 8.1991, 8.301, 8.309, 8.3855, 8.3855, 8.0741,
            7.9406, 7.9985, 7.9184
        ]);

        return (
            <div className='bg-light'>
                <Segment>
                    <Header as='h3'>
                        Original time series data displayed in red
                    </Header>
                    <Header as='h3'>
                        Re-sampled time series data displayed in green
                    </Header>
                </Segment>
                <Segment>
                    <Header as='h1' content='Original time series data' />
                    <Grid>
                        <Grid.Column width={8}>
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={utils.createCoordinateData(patternSeries)}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={utils.createCoordinateData(samplePatternSeries)}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Segment>
                    <Header as='h1' content='Time series of different length re-sampled to same length' />

                    <FlexibleWidthXYPlot height={200}>
                        <XAxis />
                        <YAxis />
                        <LineMarkSeries
                            data={utils.upSample(patternSeries, samplePatternSeries)}
                            lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                        />
                        <LineMarkSeries
                            data={utils.createCoordinateData(samplePatternSeries)}
                            lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                        />
                    </FlexibleWidthXYPlot>
                </Segment>

                <Segment>
                    <Grid>
                        <Grid.Column width={8}>
                            <Header as='h1' content='Upsampled shorter pattern series' />
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={utils.createCoordinateData(patternSeries)}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                                <LineMarkSeries
                                    data={utils.upSample(patternSeries, samplePatternSeries)}
                                    lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as='h1' content='Downsampled longer sampled pattern series' />
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={utils.createCoordinateData(samplePatternSeries)}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                                <LineMarkSeries
                                    data={utils.downSample(patternSeries, samplePatternSeries)}
                                    lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>
                    </Grid>
                </Segment>

            </div>
        )
    }
}