import * as React from 'react';
import { Header, Grid, Form, Segment, Divider } from 'semantic-ui-react';
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

    componentWillMount() {
        InputStore.setDefaultValues();

        this.onSubmitInputs(); // TODO: REMOVE ON PRODUCTION
    }

    handleInputSelectionChange = (e, data) => { InputStore.updateInputKeyValue(data.name, data.value); }

    onDefaultInputs = () => { InputStore.setDefaultValues(); }

    onClearInputs = () => { InputStore.clearDefaultValues(); }

    onSubmitInputs = () => {

        const { input } = InputStore;
        SamplingStore.symbol = input.symbol;

        TimeSeriesApi.get(input.symbol, input.outputSize)
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
                TimeSeriesStore.updateAttributes();
            })
            .catch(err => { console.log(err) });
    }

    render() {

        const { input } = InputStore;

        return (

            <Segment className='bg-light'>
                <Header as='h2' content='Time Series API Input' />
                <Divider />

                <Grid>

                    {/* Form Inputs */}
                    <Grid.Column>
                        <Form>
                            <Form.Group widths='equal'>

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

                                <Form.Button positive fluid content='Submit' onClick={this.onSubmitInputs} />
                                <Form.Button color='orange' fluid content='Default' onClick={this.onDefaultInputs} />
                                <Form.Button negative fluid content='Clear' onClick={this.onClearInputs} />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment>


        )
    }
}