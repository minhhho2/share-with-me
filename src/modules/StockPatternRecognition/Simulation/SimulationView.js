import * as React from 'react';
import { Header, Divider } from 'semantic-ui-react'
import { observer } from 'mobx-react';

import InputForm from './Input/InputForm';
import TimeSeriesView from './Sampling/TimeSeriesView';
import SamplingView from './Sampling/SamplingView';


@observer
export default class SimulationView extends React.Component {

    render() {

        return (
            <div className='p-5'>

                <Header className='text-center' as='h1' content='Pattern Processing View' />
                <Divider className='m-5' />

                {/* Input Selection */}
                <InputForm />

                {/* Time Series Data */}
                <TimeSeriesView />

                {/* Sampling Data */}
                <SamplingView />

            </div>

        )
    }
}