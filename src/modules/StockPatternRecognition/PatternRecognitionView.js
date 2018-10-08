import * as React from 'react';
import { Step, Segment, Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react';

import PatternRecognitionStore from './PatternRecognitionStore';


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
                alert("incorrect view selected in pattern recognition");
                break;
        }
    }

    render() {

        const { activeView, views } = PatternRecognitionStore;

        const renderedView = this.findView(activeView);

        return (

            <div className='p-2'>
                
                {/* Sub view selection*/}
                <Step.Group fluid>
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

                {/* Content of Sub View */}
                <Segment fluid='true'>
                    {renderedView}
                </Segment>


            </div>


        )
    }
}


