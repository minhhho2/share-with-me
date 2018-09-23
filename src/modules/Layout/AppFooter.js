import * as React from 'react';
import { Grid, Container, Divider, Header } from 'semantic-ui-react'

export default class AppFooter extends React.Component {

    render() {
        return (
            <div className='bg-dark text-center'>

                <Container >

                    {/*  Main footer content */}
                    <Grid divided='vertically'>
                        <Grid.Row columns={3} className='text-white text-left p-5'>

                            <Grid.Column>
                                <Header className='text-white' as='h2'> QAHES</Header>
                                <p>123 Abc Street, 4075, Brisbane</p>
                                <p>(+61) 400 000 000</p>
                            </Grid.Column>

                            <Grid.Column >
                                <Header className='text-white' as='h2'> _ANOTHER COLUMN_</Header>
                                <p>Content One</p>
                                <p>Content Two</p>
                            </Grid.Column>

                            <Grid.Column >
                                <Header className='text-white' as='h2'> COMPANY</Header>
                                <p>About Us</p>
                                <p>Contact Us</p>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                    <Divider className='bg-white' />

                    {/*  T&A footer content */}
                    <div className='text-center text-white p-5'>
                        <span className='p-3'>Privacy</span>
                        <span className='p-3'>Terms</span>
                        <span className='p-3'>Sitemap</span>
                    </div>

                </Container>
            </div>

        )
    }
}