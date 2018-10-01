import * as React from 'react';
import { Step, Segment, Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react';

import PatternRecognitionStore from './PatternRecognitionStore';


import TestView from './Patterns/TestView';
import PatternsView from './Patterns/PatternsView';
import SimulationView from './Simulation/SimulationView';


@observer
export default class PatternRecognitionView extends React.Component {

    onClickStepView = (e) => {
        PatternRecognitionStore.activeView = e.target.id;
    }

    findView = (v) => {
        switch (v) {
            case 'patterns':
                return <PatternsView />
            case 'simulation':
                return <SimulationView />
            default:
                return <TestView />

                break;
        }
    }

    render() {

        const { activeView, views } = PatternRecognitionStore;

        const renderedView = this.findView(activeView);

        return (

            <div className='p-3'>
                <Grid>
                    <Grid.Column width={3}>
                        <Step.Group fluid vertical>

                            {views.map((view, index) => {
                                return (
                                    <Step
                                        active={activeView === view.name}
                                        id={view.name} key={index}
                                        onClick={this.onClickStepView}>
                                        <Step.Content>
                                            <Step.Title>{view.name}</Step.Title>
                                        </Step.Content>
                                    </Step>
                                );
                            })}

                        </Step.Group>
                    </Grid.Column>

                    <Grid.Column width={13}>
                        <Segment fluid='true'>
                            {renderedView}
                        </Segment>
                    </Grid.Column>

                </Grid>

            </div>


        )
    }
}


