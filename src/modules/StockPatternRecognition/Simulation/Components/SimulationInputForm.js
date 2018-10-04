import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react';


import SimulationStore from '../SimulationStore';
import TimeSeriesApi from '../../../../api/TimeSeriesApi';
import Options from '../../constants/Options';
import * as utils from './utils.js';



@observer
export default class SimulationInputForm extends React.Component {

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
                SimulationStore.timeSeriesData.forEach((data, index) => { console.log(index + ": " + data.date); });

                SimulationStore.updateTimeSeriesAttributes();

                SimulationStore.timeSeriesGraphData = SimulationStore.timeSeriesData.map((data, index) => {
                    return { x: index, y: data.price }
                })
            })
            .catch(err => { console.log(err) });
    }


    render() {

        const { input } = SimulationStore;

        return (

            <Segment>
                <Header as='h2' content='Inputs' />
                <Grid>

                    {/* Form Inputs */}
                    <Grid.Column width={12}>
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



                        </Form>
                    </Grid.Column>

                    {/* Buttons */}
                    <Grid.Column width={4}>
                        <Form>
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
                        </Form>

                    </Grid.Column>
                </Grid>
            </Segment>


        )
    }
}