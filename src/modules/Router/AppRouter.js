// import dependencies
import * as React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { Menu, Icon, Sticky } from 'semantic-ui-react';

// import custom components
import Home from '../Views/Home';
import Error from '../Views/Error';

// import store
import AppRouterStore from './AppRouterStore';
import SectorView from '../Sector/SectorView';

@observer
export default class AppRouter extends React.Component {

    /* Set up initial states */
    componentDidMount() {
    }

    render() {

        const { activeTab } = AppRouterStore;

        return (
            <div>

                {/* Router for containing UI links and Url Routes */}
                <BrowserRouter>

                    <div>

                            {/* semantic UI components for linking to url paths */}
                            <Menu className='p-4'>
                                <Menu.Item
                                    name='home' active={activeTab === 'home'}
                                    onClick={AppRouterStore.handleTabClick}
                                    as={Link} to='/'
                                />

                                <Menu.Item
                                    name='sector' active={activeTab === 'sector'}
                                    onClick={AppRouterStore.handleTabClick}
                                    as={Link} to='/sector'
                                />

                                {/* 
                                    <MainMenu />
                                    <SecondaryMenu />
                                */}

                            </Menu>

                        {/* Switch Component that holds Routes */}
                        <br />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/sector' component={SectorView} />
                            <Route component={Error} />
                        </Switch>
                        <br />

                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
