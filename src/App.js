// Node modules

// import libraries
import * as React from 'react';
import { } from 'semantic-ui-react'

// import custom components
import AppFooter from './modules/Layout/AppFooter';
import AppHeader from './modules/Layout/AppHeader';
import AppRouter from './modules/Router/AppRouter';
import PatternRecognitionView from './modules/StockPatternRecognition/PatternRecognitionView';
export default class App extends React.Component {
    /* https://medium.com/@bryantheastronaut/ok-here-we-go-b9f683c5a00c */

    render() {


        return (
            <div className="App main-color">

                {/* Header for web app */}
                
                {/* Navigation bar  and routing for web app */}
                <PatternRecognitionView />

                {/* Footer for web app */}
   
            </div>
        );
    }
}