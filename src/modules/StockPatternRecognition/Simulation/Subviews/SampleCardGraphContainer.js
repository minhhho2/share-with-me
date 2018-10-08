import * as React from 'react';
import { Card } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries } from 'react-vis';

@observer
export default class SampleCardGraphContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        
        return (
            <Card>

                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                </Card.Content>


                <Card.Content>
                    <FlexibleWidthXYPlot height={150}>
                        <LineMarkSeries
                            data={this.props.data}
                            lineStyle={{ stroke: 'red' }}
                            markStyle={{ stroke: 'blue' }}
                        />
                    </FlexibleWidthXYPlot>
                </Card.Content>
            </Card>
        )
    }
}