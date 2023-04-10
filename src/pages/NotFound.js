import React from 'react'
import { Link as RLink } from 'react-router-dom'
import styled from 'styled-components'
function NotFound() {
  return (
    <div>
        <Center>
            <H1>Invalid Page</H1>
            <h2>404 Page not found!!</h2>
        <Link to='/'>Login Page</Link>
        </Center>
    </div>
  )
}

const Center = styled.div`
font-size:2rem;
font-weight:400;
margin:5rem;
text-align:center;
color:red;
`
const H1 = styled.h1`
font-weight:300;
font-size:4rem;
margin:5rem;
`
const Link = styled(RLink)`
text-decoration:underline;
padding : 1rem;
border-radius:1rem;
border: 1px solid purple;
transition:all 0.5s ease-in-out;
&:hover{
    color:white;
    background-color:purple;
}

`
export default NotFound