import * as React from 'react';
import { Grid, Form, Segment, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import TimeSeriesApi from '../../../../api/TimeSeriesApi';
import Options from '../../constants/ApiOptions';
import * as utils from '../Stores/utils';

// Stores
import InputStore from '../Stores/InputStore';
import TimeSeriesStore from '../Stores/TimeSeriesStore';
import SamplingStore from '../Stores/SamplingStore';

@observer
export default class InputView extends React.Component {

    componentWillMount() {
        InputStore.setDefaultValues();

        this.onSubmitInputs(); // TODO: REMOVE ON PRODUCTION
    }

    handleInputSelectionChange = (e, data) => { InputStore.updateInputKeyValue(data.name, data.value); }

    onDefaultInputs = () => { InputStore.setDefaultValues(); }

    onClearInputs = () => { InputStore.clearDefaultValues(); }

    onSubmitInputs = () => {

        const { input } = InputStore;

        TimeSeriesApi.get(input.period, input.symbol, input.outputSize)
            .then(res => {

                console.log(res.data);

                const timeSeriesPriceKey = utils.getTimeSeriesKey(Object.keys(res.data));   // Check and get key
                const rawTimeSeriesData = res.data[timeSeriesPriceKey];     // Raw Time Series (Daily) Data
                const dateKeys = Object.keys(rawTimeSeriesData);            // Date keys -> '2018-12-28'

                var data = [];

                // Store stock price date tuple                
                dateKeys.forEach(dateKey => {

                    // remove bad data
                    const price = parseFloat(rawTimeSeriesData[dateKey]['4. close']);

                    if (price === 0) { return; }

                    data.push({ date: new Date(dateKey), price: price });
                });

                // Store sorted oldest to latest price data
                TimeSeriesStore.data = utils.sortObjectsByDate(data);

                // get first 1000 for processing
                if (timeSeriesPriceKey === 'Time Series (Daily)') {
                    TimeSeriesStore.data = TimeSeriesStore.data.slice(TimeSeriesStore.data.length - 1000, TimeSeriesStore.data.length - 1);
                }
                TimeSeriesStore.updateAttributes();
            })
            .catch(err => { console.log(err) });
    }

    render() {

        const { input } = InputStore;

        return (

            <Segment className='bg-light'>

                <Grid>

                    {/* Form Inputs */}
                    <Grid.Column>
                        <Form>

                            <Form.Group>
                                <Form.Dropdown width={4}
                                    name='period' fluid selection placeholder='select your periodicity'
                                    value={input.period} options={Options.period}
                                    onChange={this.handleInputSelectionChange}
                                />

                                <Form.Dropdown width={4}
                                    name='symbol' fluid selection placeholder='select your symbol'
                                    value={input.symbol} options={Options.symbol}
                                    onChange={this.handleInputSelectionChange}
                                />

                                <Form.Dropdown width={4}
                                    name='outputSize' fluid selection placeholder='select your output size'
                                    value={input.outputSize} options={Options.outputSize}
                                    onChange={this.handleInputSelectionChange}
                                />

                                <Form.Button width={1} positive fluid content='Submit' onClick={this.onSubmitInputs} />
                                <Form.Button width={1} color='orange' fluid content='Default' onClick={this.onDefaultInputs} />
                                <Form.Button width={1} negative fluid content='Clear' onClick={this.onClearInputs} />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment>


        )
    }
}