import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import SimulationStore from './SimulationStore';
import TimeSeriesApi from '../../../api/TimeSeriesApi';
import Options from './Options';
import { observer } from 'mobx-react';


@observer
export default class SimulationInputForm extends React.Component {

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

                SimulationStore.timeSeriesGraphData = SimulationStore.timeSeriesData.map((data, index) => {
                    return { x: index, y: data.price }
                })
            })
            .catch(err => { console.log(err) });
    }

    handleInputSelectionChange = (e, data) => { SimulationStore.updateInputKeyValue(data.name, data.value); }

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