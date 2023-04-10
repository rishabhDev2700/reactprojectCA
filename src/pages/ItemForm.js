import styled from "styled-components";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Status } from "./CategoryForm";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
function ItemForm() {
  const [name, setName] = useState("");
  const [qnty, setQnty] = useState(0);
  const [supplier, setSupplier] = useState("");
  const [inStock, setInStock] = useState(false);
  const [errors,setErrors] = useState({})
  const handleForm = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      const data = { name, qnty, supplier, inStock };
      console.table(data);
      const document = collection(db, "items");
      await addDoc(document, data);
      setErrors({...errors,status:"Added Successfully!"})

    } else {
      setErrors({...errors,status:"Error Occurred!"})

    }
  };
  const validate = ()=>{
    const newerrors = {};
    if (!name ) {
      newerrors.name = "Name Required!!!";
    }
    if (!qnty) {
      newerrors.description = "Description Required!!!";
    }
    if (!supplier) {
      newerrors.location = "Location Required!!!";
    }
    return newerrors;
  }
  return (
    <Form onSubmit={(e) => handleForm(e)}>
      <h1>Item Form</h1>
      <Status>{errors.status}</Status>

      <Label htmlFor="item-name">Item Name</Label>
      <Input id="item-name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
      />
      <span>{errors.name}</span>
      <Label htmlFor="quantity">Qnty</Label>
      <Input id='quantity'
        type="number"
        onChange={(e) => setQnty(e.target.value)}
        placeholder="Quantity"
      />
      <span>{errors.qnty}</span>
      <Label htmlFor="supplier">Qnty</Label>

      <Input
        id="supplier"
        type="text"
        onChange={(e) => setSupplier(e.target.value)}
        placeholder="Supplier"
      />
      <span>{errors.supplier}</span>
      <Label htmlFor="stock">In Stock</Label>
      <Input
        id="stock"
        type="checkbox"
        onChange={(e) => setInStock(!inStock)}
        placeholder="In Stock"
      />
      <Submit type="submit" value="Save"></Submit>
    </Form>
  );
}
const Submit = styled.input`
  margin: 0.5rem;
  padding: 2rem 4rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.2rem;
`;
const Label = styled.label`
  display: inline;
  margin: 0.5rem;
  padding: 0.5rem;
`;

export default ItemForm;
