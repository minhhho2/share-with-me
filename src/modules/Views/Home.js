
import * as React from 'react';
import { observer } from 'mobx-react';
import { Container, Header, Button } from 'semantic-ui-react';

@observer
export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Container>
                <Header> Swag</Header>
                <Header> Swag</Header>
                <Header> Swag</Header>
                <Header> Swag</Header>
                <Button success content="Swag"/>
                </Container>
            </div>
        )
    }
}