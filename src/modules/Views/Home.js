
import * as React from 'react';
import { observer } from 'mobx-react';
import { Container, Header, Button } from 'semantic-ui-react';

@observer
export default class Home extends React.Component {

    render() {
        return (
            <div>
                <Container>
                    
                    <p>
                        Website that portrays financial stock data in a readable and fun format as well as finance theory on relative to the stock market.
                    </p>
                </Container>
            </div>
        )
    }
}