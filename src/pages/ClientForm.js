import styled from "styled-components";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Status } from "./CategoryForm";
import { TextArea } from "./CategoryForm";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
function ClientForm() {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const handleForm = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log("Adding document");
      const data = { name, description, location };
      console.table(data);
      const document = collection(db, "client");
      await addDoc(document, data);
      setErrors({...newErrors,status:"Successfully Added!"})

    } else {
      setErrors(newErrors);

    }
    console.table(errors);
  };
  const validateForm = () => {
    const newerrors = {};
    if (!name ) {
      newerrors.name = "Name Required!!!";
    }
    if (!description) {
      newerrors.description = "Description Required!!!";
    }
    if (!location) {
      newerrors.location = "Location Required!!!";
    }
    return newerrors;
  };
  return (
    <Form onSubmit={(e) => handleForm(e)}>
      <h1>Client Form</h1>
      <Status>{errors.status}</Status>
      <Label htmlFor="client-name">Client Name</Label>
      <Input
        id="client-name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Client Name"
      />
      <span>{errors.name}</span>
      <Label htmlFor="client-name">Client Name</Label>

      <TextArea
        onChange={(e) => setdescription(e.target.value)}
        rows="5"
        cols="25"
        placeholder="Description"
      ></TextArea>
      <span>{errors.description}</span>
      <Label htmlFor="location">Location</Label>
      <Input
      id="location"
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <span>{errors.location}</span>

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

export default ClientForm;
