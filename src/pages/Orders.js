import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ListItem from "../components/ListItem";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
function Orders() {
  const [order, setOrder] = useState([]);
  const getOrder = async () => {
    const data = []
    const querySnapshot = await getDocs(collection(db, "order"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    //   data.push(<tr key={doc.id}><td>{doc.id}</td><td>{doc.data().name}</td><td>{doc.data().qnty}</td><td>{doc.data().supplier}</td><td>{doc.data().inStock}</td></tr>);
    data.push( <ListItem uid={doc.id} item={doc.data().name} quantity={doc.data().qnty} supplier={doc.data().supplier} stock={doc.data().inStock.toString()}/>)
    });
    setOrder(data);
  };
  useEffect(() => {
    getOrder();
  },[]);
  return (
    <Wrapper>
      <Heading>Orders</Heading>
      <div>
        <Table>
          <Tr style={{ backgroundColor: "#440011", color: "white" }}>
            <Th>S.no</Th>
            <Th>Item</Th>
            <Th>Qnty</Th>
            <Th>Client</Th>
            <Th>Date</Th>
            <Th>completed</Th>
          </Tr>
         {order}
          
        </Table>
      </div>
    </Wrapper>
  );
}
export const Heading = styled.h1`
  text-align: center;
  padding: 2rem;
`;
const Wrapper = styled.div`
  background-color: #880044;
  color: white;
  height: 100vh;
`;
const Table = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const Tr = styled.tr`
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  background-color: white;
  color: #880044;
  padding: 1rem;
  border: 1px solid #110011;
`;

const Th = styled.th``;

export default Orders;
