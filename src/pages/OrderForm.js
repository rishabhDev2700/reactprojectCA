import styled from "styled-components";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Status } from "./CategoryForm";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
function OrderForm() {
  const [name, setName] = useState("");
  const [qnty, setQnty] = useState(0);
  const [location, setLocation] = useState("");
  const [supplier,setSupplier] = useState("");
  const [orderdate,setOrderdate] = useState({});
  const [errors, setErrors] = useState({});
  const handleForm = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Adding document");
      const data = { name, qnty, location,supplier,orderdate };
      console.table(data);
      const document = collection(db, "client");
      await addDoc(document, data);
      setErrors({...newErrors,status:"Successfully Added!"})

    } else {
      setErrors(newErrors);
      setErrors({...newErrors,status:"Error Occurred!"})

    }
    console.table(errors);
  };
  const validateForm = () => {
    const newerrors = {};
    if (!name ) {
      newerrors.name = "Name Required!!!";
    }
    if (qnty<1) {
      newerrors.qnty = "Qnty Cannot be 0!!!";
    }
    if (!location) {
      newerrors.location = "Location Required!!!";
    }if (!supplier) {
      newerrors.supplier = "Location Required!!!";
    }if (!orderdate) {
      newerrors.orderdate = "Location Required!!!";
    }
    return newerrors;
  };
  return (
    <Form onSubmit={(e) => handleForm(e)}>
      <h1>Order Form</h1>
      <Status>{errors.status}</Status>
      <Label htmlFor="client-name">Client Name</Label>
      <Input
        id="client-name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Client Name"
      />
      <span>{errors.name}</span>

      <Label htmlFor="qnty">Qnty</Label>
      <Input
        id="qnty"
        onChange={(e) => setQnty(e.target.value)}
        placeholder="Qnty"
      ></Input>
      <span>{errors.qnty}</span>
      <Label htmlFor="location">Location</Label>
      <Input
      id="location"
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <span>{errors.location}</span>
      <Label htmlFor="supplier">Supplier</Label>
      <Input
      id="supplier"
        type="text"
        onChange={(e) => setSupplier(e.target.value)}
        placeholder="supplier"
      />
      <span>{errors.supplier}</span>
      <Label htmlFor="orderdate">orderdate</Label>
      <Input
      id="orderdate"
        type="date"
        onChange={(e) => setOrderdate(e.target.value)}
        placeholder="Date"
      />
      <span>{errors.orderdate}</span>

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

export default OrderForm;
