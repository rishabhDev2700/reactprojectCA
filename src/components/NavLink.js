import {Link} from 'react-router-dom';
import styled from 'styled-components';
export const NavBar = styled.div`
height:100vh;
background-color:#880044;
padding:2rem;
display:flex;
flex-wrap:wrap;
justify-content:center;
align-items:center;
color:white;

`
export const NavLink = styled(Link)`
padding:5rem;
margin:0.5rem 1rem;
border-radius:1rem;
background-color:white;
border:2px solid white;
color:#880044;
transition:0.5s all ease-in-out;
&:hover{
    color:white;
    background-color:#880044;
    border:2px solid white;
}
`
