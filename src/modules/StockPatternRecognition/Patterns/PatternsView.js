import * as React from 'react';
import { Grid, Divider, Button, Form, Segment, Image } from 'semantic-ui-react';
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



    render() {



        const { definedPatterns } = PatternsStore;

        return (
            <div>

                <Segment>
                    {definedPatterns.map((pattern, index) => {
                        return (
                            <div key={index}>
                                <p>
                                    {pattern.name}
                                </p>

                                <XYPlot height={200} width={200}>
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


                            </div>
                        );
                    })}
                </Segment>
                <Segment>

                </Segment>
            </div>
        )
    }
}