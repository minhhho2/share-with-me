// import dependencies
import * as React from 'react';
import { observer } from 'mobx-react';

import { Header, Divider } from 'semantic-ui-react';

@observer
export default class Error extends React.Component {

    render() {
        return (

            <div>
                <Header as='h1'>Error Page</Header>
                <br />
                <Divider />
                <Header as='h1'>Error Page</Header>
                <br />
                <Divider />
                <Header as='h1'>Error Page</Header>
                <br />
                <Divider />
            </div>

        );
    }
}
