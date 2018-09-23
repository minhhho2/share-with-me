
import * as React from 'react';
import { observer } from 'mobx-react';
import { Container, Header } from 'semantic-ui-react';

@observer
export default class Test extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Header> Swag</Header>
                    <Header> Swag</Header>
                    <Header> Swag</Header>
                    <Header> Swag</Header>
                </Container>
            </div>
        )
    }
}