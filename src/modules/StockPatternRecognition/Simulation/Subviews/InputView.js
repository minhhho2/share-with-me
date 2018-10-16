import * as React from 'react';
import { Grid, Form, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import TimeSeriesApi from '../../../../api/TimeSeriesApi';
import Options from '../../constants/ApiOptions';
import * as Utils from '../../Helper/Utils';

// Stores
import InputStore from '../Stores/InputStore';
import TimeSeriesStore from '../Stores/TimeSeriesStore';

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

        TimeSeriesApi.get(input.period, input.symbol)
            .then(res => {
                console.log(res.data);

                const timeSeriesPriceKey = Utils.getTimeSeriesKey(Object.keys(res.data));   // Check and get key
                const rawTimeSeriesData = res.data[timeSeriesPriceKey];                     // Raw Time Series (Daily) Data
                
                TimeSeriesStore.data = Utils.preprocess(rawTimeSeriesData);
                
                // Get 1000 only for daily TODO: REMOVE FOR RESULTS
                if (timeSeriesPriceKey === 'Time Series (Daily)') {
                    TimeSeriesStore.data = TimeSeriesStore.data.slice(-250);
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
                    <Grid.Column>
                        <Form>
                            <Form.Group>
                                <Form.Dropdown width={5}
                                    name='period' fluid selection placeholder='select your periodicity'
                                    value={input.period} options={Options.period}
                                    onChange={this.handleInputSelectionChange}
                                />

                                <Form.Dropdown width={5}
                                    name='symbol' fluid selection placeholder='select your symbol'
                                    value={input.symbol} options={Options.symbol}
                                    onChange={this.handleInputSelectionChange}
                                />

                                <Form.Button width={2} positive fluid content='Submit' onClick={this.onSubmitInputs} />
                                <Form.Button width={2} color='orange' fluid content='Default' onClick={this.onDefaultInputs} />
                                <Form.Button width={2} negative fluid content='Clear' onClick={this.onClearInputs} />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment>


        )
    }
}