import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react';


import SimulationStore from '../SimulationStore';
import TimeSeriesApi from '../../../../api/TimeSeriesApi';
import Options from '../../constants/Options';
import * as utils from './utils';



@observer
export default class InputForm extends React.Component {

    componentDidMount() {
        // TODO: Remove when testing over -> only gets stock data straight away
        this.onDefaultInputs();
        this.onSubmitInputs();
    }

    handleInputSelectionChange = (e, data) => {
        SimulationStore.updateInputKeyValue(data.name, data.value);
    }

    // FORM HANDLERS
    onDefaultInputs = () => { SimulationStore.default(); }
    onClearInputs = () => { SimulationStore.clear(); }

    onSubmitInputs = () => {

        // Get stock data based on inputs
        const { input } = SimulationStore;
        TimeSeriesApi.get(input.period, input.symbol, input.interval, input.outputSize)
            .then(res => {

                // Get the key for time series price data array from response
                const timeSeriesPriceKey = utils.getTimeSeriesPriceKeyFromResponse(Object.keys(res.data));

                // Get time series price data and date keysfrom response
                const rawTimeSeriesData = res.data[timeSeriesPriceKey];
                const dateKeys = Object.keys(rawTimeSeriesData);

                // Store stock price data tuple
                var data = [];
                dateKeys.forEach(dateKey => {
                    data.push({
                        date: new Date(dateKey),
                        price: rawTimeSeriesData[dateKey]['4. close']
                    })
                });

                // Store sorted oldest to latest price data
                SimulationStore.timeSeriesData = utils.sortTimeSeriesDataByPrice(data);
                //SimulationStore.timeSeriesData.forEach((data, index) => { console.log(index + ": " + data.date); });

                SimulationStore.updateTimeSeriesAttributes();

                SimulationStore.timeSeriesGraphData = SimulationStore.timeSeriesData.map((data, index) => {
                    return { x: index, y: data.price }
                });
            })
            .catch(err => { console.log(err) });
    }


    onStartSampling = () => {
        this.onStopSampling();
        SimulationStore.windowPos = 0;
        SimulationStore.intervalId = setInterval(this.timer, 200);
    }

    onStopSampling = () => {
        clearInterval(SimulationStore.intervalId);
    }

    timer = () => {
        console.log(`index ${windowPos}`);

        const {windowPos, timeSeriesData, period } = SimulationStore;
        SimulationStore.windowPos = windowPos + 1;

        // stop sampling
        if (SimulationStore.windowPos > (timeSeriesData.length - period)) {
            this.onStopSampling();
        }
    }

    /* What is this for?!?!?!*/
    getSample = () => {
        if (SimulationStore.intervalId != null) {
            // configure sample appearance
            var sampleData = [];
            for (var i = SimulationStore.windowPos; i < SimulationStore.windowPos + SimulationStore.period; i++) {
                sampleData.push({ x: i, y: SimulationStore.timeSeriesGraphData[i]['y'] });
            }
            return sampleData;
        } else {
            return [{ x: 100, y: 100 }];
        }

    }


    render() {

        const { input, timeSeriesAttributes } = SimulationStore;

        return (

            <Segment>
                <Header as='h2' content='Inputs' />
                <Grid>

                    {/* Form Inputs */}
                    <Grid.Column width={8}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Dropdown
                                    label='Period' name='period'
                                    fluid selection value={input.period}
                                    onChange={this.handleInputSelectionChange}
                                    options={Options.period}
                                />
                                <Form.Dropdown
                                    label='Symbol' name='symbol'
                                    fluid selection value={input.symbol}
                                    onChange={this.handleInputSelectionChange}
                                    options={Options.symbol}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Dropdown
                                    label='Interval' name='interval'
                                    fluid selection value={input.interval}
                                    onChange={this.handleInputSelectionChange}
                                    options={Options.interval}
                                />
                                <Form.Dropdown
                                    label='Output Size' name='outputSize'
                                    fluid selection value={input.outputSize}
                                    onChange={this.handleInputSelectionChange}
                                    options={Options.outputSize}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Button
                                    color='orange' fluid content='Default Inputs'
                                    onClick={this.onDefaultInputs}
                                />
                                <Form.Button
                                    negative fluid content='Clear Inputs'
                                    onClick={this.onClearInputs}
                                />
                                <Form.Button
                                    positive fluid content='Submit Inputs'
                                    onClick={this.onSubmitInputs}
                                />
                            </Form.Group>



                        </Form>
                    </Grid.Column>


                    {/* Stats */}
                    <Grid.Column width={8}>
                        <p><strong>Date: </strong>{`${timeSeriesAttributes.startDate} to ${timeSeriesAttributes.endDate}`}</p>
                        <p><strong>Price: </strong>{`${timeSeriesAttributes.startPrice} to ${timeSeriesAttributes.endPrice}`}</p>
                        <p><strong>Samples: </strong>{`${timeSeriesAttributes.numberDataPoints}`}</p>

                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Button fluid type='button' onClick={this.onStartSampling} content='Start Sampling' />
                                <Form.Button fluid type='button' onClick={this.onStopSampling} content='Stop Sampling' />
                            </Form.Group>
                        </Form>

                    </Grid.Column>
                </Grid>
            </Segment>


        )
    }
}