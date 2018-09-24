import * as React from 'react';
import { Grid, Container, Divider, Header } from 'semantic-ui-react'

export default class AppFooter extends React.Component {

    render() {

        /* Social Links to Developer */
        const clickers = [
            {
                href: "https://www.facebook.com/minh.nguyen.14661",
                icon: 'facebook square icon huge'
            },
            {
                href: "https://github.com/minhhho2",
                icon: 'git square icon huge'
            },
            {
                href: "https://www.linkedin.com",
                icon: 'linkedin square icon huge'
            }
        ];

        return (
            <div className='text-center'>=

                <Divider className='bg-white m-3' />

                {/*  T&A footer content */}
                <Container className='p-5'>

                    <Header as='h3' className='inverted'> Minh D. Nguyen</Header>
                    {clickers.map((click, index) => {
                        return <a key={index} href={click.href}> <i className={click.icon}></i></a>
                    })}
                    
                </Container>
            </div>
        )
    }
}