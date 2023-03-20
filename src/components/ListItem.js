import React from 'react'
import styled from 'styled-components'



function ListItem({uid,item,quantity,supplier,stock}) {
  return (
    <Tr>
          <Td>{uid}</Td>
          <Td>{item}</Td>
          <Td>{quantity}</Td>
          <Td>{supplier}</Td>
          <Td>{stock.toString()}</Td>
        </Tr>
  )
}
export const Tr = styled.tr`
  display: flex;
  justify-content: space-around;
  border:2px solid #880044;
  padding:0.5rem;
`;
const Td = styled.td`
width:15rem;
margin:1rem`;
export default ListItem
