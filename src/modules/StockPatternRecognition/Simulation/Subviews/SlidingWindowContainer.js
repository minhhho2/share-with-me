import * as React from 'react';
import { Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react';
import { FlexibleWidthXYPlot, LineMarkSeries } from 'react-vis';

@observer
export default class SlidingWindowContainer extends React.Component {

    render() {
        return (
            <Segment>
                <FlexibleWidthXYPlot height={50} xDomain={[0, this.props.length]}>
                    <LineMarkSeries data={this.props.data} />
                </FlexibleWidthXYPlot>
            </Segment>
        )
    }
}