import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react';

import InputForm from './Input/InputForm';
import TimeSeriesView from './Sampling/TimeSeriesView';
import SamplingView from './Sampling/SamplingView';

import SimulationStore from './SimulationStore';


@observer
export default class SimulationView extends React.Component {

    componentDidMount = () => { SimulationStore.setup(); }

    render() {

        const { timeSeriesData } = SimulationStore;

        return (
            <div className='p-5'>

                <Header className='text-center' as='h1' content='Pattern Processing View' />
                <Divider className='m-5' />

                {/* Input Selection */}
                <InputForm />

                {/* Sampling Data */}
                <SamplingView />

                {/* Time Series Data */}
                <TimeSeriesView />



            </div>

        )
    }
}