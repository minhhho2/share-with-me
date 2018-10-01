import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import SimulationStore from './SimulationStore';
import TimeSeriesApi from '../../../api/TimeSeriesApi';
import Options from './Options';
import { observer } from 'mobx-react';
import SimulationInputForm from './SimulationInputForm';

import { FlexibleWidthXYPlot, XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import 'react-vis/dist/style.css';


@observer
export default class SimulationView extends React.Component {

    componentDidMount = () => { SimulationStore.setup(); }

    // FORM HANDLERS
    onDefaultInputs = () => { SimulationStore.default(); }
    onClearInputs = () => { SimulationStore.clear(); }

    onSubmitInputs = () => {
        const { input } = SimulationStore;
        TimeSeriesApi.get(input.period, input.symbol, input.interval, input.outputSize)
            .then(res => {
                const keys = Object.keys(res.data);
                const key = keys.filter(key => {
                    const words = key.split(' ');
                    return words.includes('Time') && words.includes('Series');
                })[0];


                const data = res.data[key];
                const dateKeys = Object.keys(data);
                dateKeys.forEach((dateKey, index) => {
                    SimulationStore.timeSeriesData.push(
                        {
                            date: new Date(dateKey),
                            price: data[dateKey]['4. close']
                        }
                    )
                })

                // ensures order
                SimulationStore.timeSeriesData.sort((a, b) => {
                    // Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
                    return b['date'] - a['price'];
                });

                SimulationStore.refreshTimeSeriesAttributes();
                console.log(SimulationStore.timeSeriesData.toJS());
                // order by date
            })
            .catch(err => {
                console.log(err)
            });
    }

    handleInputSelectionChange = (e, data) => {
        SimulationStore.updateInputKeyValue(data.name, data.value);
    }

    render() {

        const { input, timeSeriesData } = SimulationStore;

        var data = timeSeriesData.map((data, index) => {
            return {x: data.date, y: data.price}
        })

        return (
            <div className='p-5'>

                <Header className='text-center' as='h1' content='Pattern Processing View' />
                <Divider className='m-5' />

                {/* Input Selection */}
                <SimulationInputForm />

                {/* Time Series Data */}
                <Segment>

                    <Header as='h2' content='Time Series Data' />
                    <Divider />
                    <FlexibleWidthXYPlot height={400}>
                        <LineSeries data={data} />
                        <XAxis />
                        <YAxis />
                    </FlexibleWidthXYPlot>
                    <p>{`Start Date: ${SimulationStore.startDate}`}</p>
                    <p>{`End Date: ${SimulationStore.endDate}`}</p>
                    <p>{`Start Price: ${SimulationStore.startPrice}`}</p>
                    <p>{`End Price: ${SimulationStore.endPrice}`}</p>
                    <p>{`Number data points: ${SimulationStore.numberDataPoints}`}</p>
                </Segment>

                {/* Sample View */}
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Header as='h1' content='Sample' />
                        <Divider />
                        <Button content='click me'></Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header as='h1' content='Comparing Class' />
                        <Divider />
                        <Button content='click me'></Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header as='h1' content='Identified Classes' />
                        <Divider />
                        <Button content='click me'></Button>
                    </Grid.Column>

                </Grid.Row>


            </div>

        )
    }
}