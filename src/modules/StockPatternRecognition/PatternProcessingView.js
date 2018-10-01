import * as React from 'react';
import { Header, Grid, Divider, Button, Form, Segment, Image } from 'semantic-ui-react'
import PatternProcessingStore from './PatternProcessingStore';
import TimeSeriesApi from '../../api/TimeSeriesApi';


export default class PatternProcessingView extends React.Component {

    componentDidMount = () => {
        PatternProcessingStore.setup();
    }

    // FORM HANDLERS
    onDefaultInputs = () => { } // TODO: Set form to default inputs 
    onClearInputs = () => { } // TODO: Clear form to nothing 
    onSubmitInputs = () => {

        // Get states
        const period = 'TIME_SERIES_DAILY';
        const symbol = 'ASX:XJO';
        const interval = '60min';
        const outputSize = 'compact'

        // API Call
        TimeSeriesApi.get(period, symbol, interval, outputSize)
            .then(res => console.log(res))
            // TODO: Process and store data
            .catch(err => console.log(err));
    }

    render() {

        const { } = PatternProcessingStore;


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
                                    <Form.Input fluid label='Period' placeholder='period' />
                                    <Form.Input fluid label='Symbol' placeholder='symbol' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Interval' placeholder='interval' />
                                    <Form.Input fluid label='Output Size' placeholder='output size' />
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