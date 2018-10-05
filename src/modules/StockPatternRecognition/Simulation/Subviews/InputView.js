import * as React from 'react';
import { Header, Grid, Form, Segment, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import TimeSeriesApi from '../../../../api/TimeSeriesApi';
import Options from '../../constants/Options';
import * as utils from '../Stores/utils';

// Stores
import InputStore from '../Stores/InputStore';
import TimeSeriesStore from '../Stores/TimeSeriesStore';
import SamplingStore from '../Stores/SamplingStore';

@observer
export default class InputView extends React.Component {

    componentDidMount() {
        InputStore.setDefaultValues();
        this.onSubmitInputs(); // TODO: REMOVE ON PRODUCTION
    }

    handleInputSelectionChange = (e, data) => { InputStore.updateInputKeyValue(data.name, data.value); }

    onDefaultInputs = () => { InputStore.setDefaultValues(); }

    onClearInputs = () => { InputStore.clearDefaultValues(); }

    onSubmitInputs = () => {

        // Get stock data based on inputs
        const { input } = InputStore;
        SamplingStore.period = parseInt(input.period);

        TimeSeriesApi.get(input.period, input.symbol, input.outputSize)
            .then(res => {
                console.log(res.data);

                // Get the key for time series price data array from response
                const timeSeriesPriceKey = utils.getTimeSeriesPriceKeyFromResponse(Object.keys(res.data));

                // Get time series price data and date keysfrom response
                const rawTimeSeriesData = res.data[timeSeriesPriceKey];
                const dateKeys = Object.keys(rawTimeSeriesData);

                // Store stock price data tuple
                var data = [];
                dateKeys.forEach(dateKey => {

                    const price = parseFloat(parseFloat(rawTimeSeriesData[dateKey]['4. close']).toFixed(2));
                    if (price === 0) { return; }

                    data.push({
                        date: new Date(dateKey),
                        price: price
                    })
                });


                // Store sorted oldest to latest price data
                TimeSeriesStore.data = utils.sortTimeSeriesDataByPrice(data);
                TimeSeriesStore.updateAttributes();
                SamplingStore.symbol = input.symbol;
            })
            .catch(err => { console.log(err) });
    }

    render() {

        const { input } = InputStore;

        return (

            <Segment className='bg-light'>
                <Header as='h2' content='Inputs' />
                <Grid>

                    {/* Form Inputs */}
                    <Grid.Column>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    type='number' label='Period' name='period' fluid
                                    value={input.period}
                                    onChange={this.handleInputSelectionChange}
                                />
                                <Form.Dropdown
                                    label='Symbol' name='symbol' fluid selection
                                    value={input.symbol} options={Options.symbol}
                                    onChange={this.handleInputSelectionChange}
                                />
                                <Form.Dropdown
                                    label='Output Size' name='outputSize' fluid selection
                                    value={input.outputSize} options={Options.outputSize}
                                    onChange={this.handleInputSelectionChange}
                                />

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
                </Grid>
            </Segment>


        )
    }
}