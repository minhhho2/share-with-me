
import * as React from 'react';
import { observer } from 'mobx-react';
import { Container, Header, Divider } from 'semantic-ui-react';

@observer
export default class Home extends React.Component {

    render() {
        return (
            <div className='text-white'>
                <div className='text-center'>
                    <Container className='m-3'>
                        <Header as='h1' content='Finance Hub for stock market data and finance theory' />
                        <Divider />
                        <br />
                        <br />
                        <br />
                        <br />
                    </Container>
                </div>

                <Container className='m-3'>
                    <Header as='h2' content='Share With Me!' />
                    <Divider />
                    <p>
                        Website that portrays financial stock data in a readable and fun format as well as finance theory on relative to the stock market.
                    </p>
                    <br />
                    <br />
                    <br />
                    <br />
                </Container>

                <Container>
                    <Header as='h2' content='Latest News' />
                    <Divider />
                    <p>cool cool</p>
                    <br />
                    <br />
                    <br />
                    <br />
                </Container>
            </div>
        )
    }
}