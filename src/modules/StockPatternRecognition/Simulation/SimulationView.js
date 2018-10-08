import * as React from 'react';
import { Header, Divider } from 'semantic-ui-react'
import { observer } from 'mobx-react';

import InputView from './Subviews/InputView';
import TimeSeriesView from './Subviews/TimeSeriesView';
import SamplingView from './Subviews/SamplingView';


@observer
export default class SimulationView extends React.Component {

    render() {

        return (
            <div className='p-3'>

                <Header className='text-center' as='h1' content='Pattern Processing View' />
                <Divider className='m-5' />

                {/* Input Selection */}
                <InputView />

                {/* Time Series Data */}
                <TimeSeriesView />

                {/* Sampling Data */}
                <SamplingView />

            </div>

        )
    }
}