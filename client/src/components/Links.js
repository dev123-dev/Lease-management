import React, { Component } from 'react'
// import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

// const Container = styled.div.attrs({
//     className: 'container',
// })`
//     height: 150px;
// `

// const Nav = styled.nav.attrs({
//     className: 'navbar navbar-expand-lg navbar-dark bg-dark',
// })`
//     margin-bottom: 20 px;
// `

class NavBar extends Component {
    render() {
        return (
            <>
        <div class="container"></div>

            {/* <container >
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </container> */}
            </>
          
        )
    }
}

export default NavBar
