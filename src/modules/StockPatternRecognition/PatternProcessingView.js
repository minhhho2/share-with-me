import * as React from 'react';
import { Header, Grid, Divider, Button, Form, Input } from 'semantic-ui-react'
import PatternProcessingStore from './PatternProcessingStore';
import TimeSeriesApi from '../../api/TimeSeriesApi';


export default class PatternProcessingView extends React.Component {

    componentDidMount = () => {
        PatternProcessingStore.setup();
    }

    onClearInputs = () => {

    }
    onSubmitInputs = () => {
        // Get states
        // Api Call
        const period = 'TIME_SERIES_DAILY';
        const symbol = 'ASX:XJO';
        const interval = '60min';
        const outputSize = 'compact'

        TimeSeriesApi.get(period, symbol, interval, outputSize).then(res => console.log(res))
            .catch(err => console.log(err));
    }

    render() {

        const { tester } = PatternProcessingStore;


        return (
            <div className='p-5'>
                <Header className='text-light' as='h1' content={tester} />

                <Header className='text-light' as='h1' content='Pattern Processing View' />

                <Grid>

                    {/* Time Series Selection */}
                    <Grid.Row>
                        {/* Form Inputs */}
                        <Grid.Column width={13}>
                            <Form>
                                <Form.Input label='Period' placeholder='period' />
                                <Form.Input label='Symbol' placeholder='symbol' />
                                <Form.Input label='Interval' placeholder='interval' />
                                <Form.Input label='Output Size' placeholder='output size' />
                            </Form>
                        </Grid.Column>

                        {/* Buttons */}
                        <Grid.Column width={3}>
                            <Form>
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


                        <Header as='h3' content='Inputs' />
                        <Divider />
                        <Form>
                            <Form.Input label='Enter Password' type='password' />
                        </Form>
                    </Grid.Row>

                    <Grid.Row>
                        <Header as='h1' content='Time Series' />
                        <Divider />
                        <Button content='click me'></Button>
                    </Grid.Row>


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
                </Grid>

            </div>

        )
    }
}