import * as React from 'react';
import { Header, Grid, Divider, Dropdown, Button, Form, Segment, Image } from 'semantic-ui-react'
import SimulationStore from './SimulationStore';
import TimeSeriesApi from '../../../api/TimeSeriesApi';
import MockPatterns from '../../../api/MockPatterns';
import Options from './Options';
import { observer } from 'mobx-react';

@observer
export default class SimulationView extends React.Component {

    componentDidMount = () => {
        SimulationStore.setup();
    }

    // FORM HANDLERS
    onDefaultInputs = () => { SimulationStore.default(); }
    onClearInputs = () => { SimulationStore.clear(); }

    onSubmitInputs = () => {
        const { input } = SimulationStore;
        TimeSeriesApi.get(input.period, input.symbol, input.interval, input.outputSize)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
    }

    handleInputSelectionChange = (e, data) => {
        SimulationStore.updateInputKeyValue(data.name, data.value);
    }

    render() {

        const { input } = SimulationStore;

        return (
            <div className='p-5'>

                <Header className='text-center' as='h1' content='Pattern Processing View' />
                <Divider className='m-5' />

                {/* Input Selection */}
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


                {/* Time Series Data */}
                <Segment>

                    <Header as='h2' content='Time Series Data' />
                    <Divider />
                    <Image src='https://cdn4.buysellads.net/uu/1/3386/1525189887-61450.png' size='huge' />
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