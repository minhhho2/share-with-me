import * as React from 'react';
import { Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import {
    FlexibleWidthXYPlot, LineMarkSeries,
    XAxis, YAxis
} from 'react-vis';

@observer
export default class SlidingWindowContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Segment>
                <FlexibleWidthXYPlot height={100} xDomain={[0, this.props.length]}>
                    <XAxis />
                    <YAxis />
                    <LineMarkSeries data={this.props.data} />
                </FlexibleWidthXYPlot>
            </Segment>
        )
    }
}