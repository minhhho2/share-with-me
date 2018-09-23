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
import Test from '../Views/Test';
import Sector from '../Sector/Sector';

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
                        <Sticky>    {/* Allows scrollable nav bar */}

                            {/* semantic UI components for linking to url paths */}
                            <Menu className='bg-info p-4' pointing secondary icon='labeled' >
                                <Menu.Item
                                    name='home' active={activeTab === 'home'}
                                    icon={<Icon name='home' />}
                                    onClick={AppRouterStore.handleTabClick}
                                    as={Link} to='/'
                                />

                                <Menu.Item
                                    name='sector' active={activeTab === 'sector'}
                                    icon={<Icon name='home' />}
                                    onClick={AppRouterStore.handleTabClick}
                                    as={Link} to='/sector'
                                />

                                <Menu.Item
                                    name='test' active={activeTab === 'test'}
                                    icon={<Icon name='home' />}
                                    onClick={AppRouterStore.handleTabClick}
                                    as={Link} to='/test'
                                />

                                {/* 
                                    <MainMenu />
                                    <SecondaryMenu />
                                */}

                            </Menu>
                        </Sticky>

                        {/* Switch Component that holds Routes */}
                        <br />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/sector' component={Sector} />
                            <Route exact path='/test' component={Test} />
                            <Route component={Error} />
                        </Switch>
                        <br />

                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
