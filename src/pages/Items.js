import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import ListItem from "../components/ListItem";
import { Tr } from "../components/ListItem";
import { Heading } from "./Orders";
import { List, Th } from "../components/List";
function Items() {
  const [items, setItems] = useState([]);
  const getItems = async () => {
    const data = []
    const querySnapshot = await getDocs(collection(db, "items"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    data.push( <ListItem uid={doc.id} item={doc.data().name} quantity={doc.data().qnty} supplier={doc.data().supplier} stock={doc.data().inStock}/>)
    });
    setItems(data);
  };
  useEffect(() => {
    getItems();
  },[]);
  return (
    <div>
      <Heading>Items</Heading>
      <List>
        <Tr>
          <Th>ID</Th>
          <Th>Item</Th>
          <Th>Qnty</Th>
          <Th>Supplier</Th>
          <Th>In Stock</Th>
        </Tr>
          {items}
      </List>
    </div>
  );
}

export default Items;
