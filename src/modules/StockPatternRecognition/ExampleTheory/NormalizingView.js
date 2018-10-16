import * as React from 'react';
import { observer } from 'mobx-react';
import { Grid, Segment, Header } from 'semantic-ui-react'
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';
import _ from 'lodash';


import * as Utils from '../Helper/Utils';
import * as Resampling from '../Helper/Resampling';
import MockPattern from '../constants/MockPatterns';

@observer
export default class NormalizingView extends React.Component {

    render() {
        var patternSeries = MockPattern.defined[0].values.slice(); //[0, 50, 100, 150, 200, 150, 100, 50, 0, 50, 100, 150, 200, 150, 100, 50, 0];
        var samplePatternSeries = [
            7.321, 7.2734, 7.0229, 7.3401, 7.1488, 7.5403, 7.6639, 7.7182, 7.9629,
            7.8534, 8.1008, 8.0074, 7.9989, 7.8962, 7.9576, 7.8739, 7.7863, 7.7405,
            7.7671, 7.8517, 7.9184, 7.9371, 8.1991, 8.301, 8.309, 8.3855, 8.3855, 8.0741,
            7.9406, 7.9985, 7.9184, 7.2734, 7.0229, 7.3401, 7.1488, 7.5403, 7.6639, 7.7182,
            7.9629, 7.8534, 8.1008, 8.0074, 7.9989, 7.8962, 7.9576, 7.8739, 7.7863, 7.7405,
            7.7671, 7.8517, 7.9184, 7.9371, 8.1991, 8.301, 8.309, 8.3855, 8.3855, 8.0741
        ];

        var resampledPatternSeries = Resampling.resample(patternSeries);
        var resampledsamplePatternSeries = Resampling.resample(samplePatternSeries);

        return (
            <div className='bg-light'>

                <Header as='h1' content='Normalizing time series length by upsampling and down sampling' />
                <Segment>
                    <Grid>
                        <Grid.Column width={8}>
                            <Header as='h2' content='Time series for defined patterns at length 33 and 33' />
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(Utils.normalize(patternSeries))}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(Resampling.resample(patternSeries))}
                                    lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>

                        <Grid.Column width={8}>
                            <Header as='h2' content='Time series for sample at length 79 and 33' />
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(Utils.normalize(samplePatternSeries))}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(Resampling.resample(samplePatternSeries))}
                                    lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Segment>
                    <Header as='h2' content='Both time series re-sampled to length 33' />
                    <FlexibleWidthXYPlot height={200}>
                        <XAxis />
                        <YAxis />
                        <LineMarkSeries
                            data={Utils.createCoordinateData(resampledPatternSeries)}
                            lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                        />
                        <LineMarkSeries
                            data={Utils.createCoordinateData(resampledsamplePatternSeries)}
                            lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                        />
                    </FlexibleWidthXYPlot>
                </Segment>

                <Header as='h1' content='Normalizing time series height by scaling min and max value' />
                <Segment>
                    <Grid>
                        <Grid.Column width={8}>
                            <Header as='h2' content='Sampled stock price time series' />
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(samplePatternSeries)}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>

                        <Grid.Column width={8}>
                            <Header as='h2' content='Normalized stock price time series to between 0 and 200' />
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(Utils.normalize(samplePatternSeries))}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        )
    }
}