import * as React from 'react';
import { observer } from 'mobx-react';
import { Grid, Segment, Header } from 'semantic-ui-react'
import { FlexibleWidthXYPlot, LineMarkSeries, XAxis, YAxis } from 'react-vis';
import _ from 'lodash';


import * as Utils from '../Helper/Utils';
import * as Preprocess from '../Helper/Preprocess';
import * as Classifier from '../Helper/Classifier';

import MockPattern from '../constants/MockPatterns';

@observer
export default class NormalizingView extends React.Component {

    render() {
        var label = [200, 181, 162, 143, 124, 105, 86, 67, 48, 79, 110, 141, 172, 203, 234, 265, 296, 277, 258, 239, 220, 201, 182, 163, 144, 175, 206, 237, 268, 299, 330, 361, 392];
        var sample = [17.7077, 17.4927, 17.6796, 17.0536, 17.0909, 17.2404, 15.5678, 15.9322, 14.9884, 15.437, 14.9043, 14.8389, 15.3716, 16.278, 16.0257, 17.0536, 16.5957, 16.9041, 17.175, 17.446, 17.8385, 18.0908, 18.3151, 19.67, 19.3242, 19.2495, 19.4644, 18.8664, 19.6139, 19.9036, 20.7913, 19.128, 18.6701, 18.7169, 19.9503, 19.7354, 20.4175, 20.5764, 20.511, 20.3708, 20.1839, 21.0997, 21.2585, 21.8192, 22.1743, 23.0433, 24.3422, 23.8563];

        var samplePrice = Preprocess.normalizePrice(sample);
        var samplePeriod = Preprocess.normalizePeriod(sample);

        var labelPrice = Preprocess.normalizePrice(label);
        var labelPeriod = Preprocess.normalizePeriod(label);

        var parsedSample = Preprocess.normalize(sample);
        var parsedLabel = Preprocess.normalize(label);

        return (
            <div className='bg-light'>
                <Segment className='p-3'>
                    <Grid columns={2}>

                        <Grid.Column width={8}>
                            <Header as='h2'> Original price and period: {Classifier.distance(sample, label)}</Header>
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(sample)}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(label)}
                                    lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>

                        <Grid.Column width={8}>
                            <Header as='h2'> Normalize price and original period: {Classifier.distance(samplePrice, labelPrice)}</Header>
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(samplePrice)}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(labelPrice)}
                                    lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as='h2'> Original price and normalize period: {Classifier.distance(samplePeriod, labelPeriod)}</Header>
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(samplePeriod)}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(labelPeriod)}
                                    lineStyle={{ stroke: 'green' }} markStyle={{ stroke: 'pink' }}
                                />
                            </FlexibleWidthXYPlot>
                        </Grid.Column>

                        <Grid.Column width={8}>
                        <Header as='h2'> Normalize price and period: {Classifier.distance(parsedSample, parsedLabel)}</Header>
                            <FlexibleWidthXYPlot height={200}>
                                <XAxis />
                                <YAxis />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(parsedSample)}
                                    lineStyle={{ stroke: 'red' }} markStyle={{ stroke: 'blue' }}
                                />
                                <LineMarkSeries
                                    data={Utils.createCoordinateData(parsedLabel)}
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