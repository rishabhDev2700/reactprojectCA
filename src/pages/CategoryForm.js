import styled from 'styled-components'
import { Form } from '../components/Form'
import { Input } from '../components/Input'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'
function CategoryForm() {
  const [name,setName] = useState("");
  const [description,setdescription] = useState("");
  const [errors,setErrors] = useState({});

  const handleForm = async(e)=>{
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      const data = {name,description};
      console.table(data);
      const document = collection(db, 'category');
      await addDoc(document, data);
      setErrors({...newErrors,status:"Successfully Added!"})
    } else {
      console.log("Error")
      setErrors(newErrors);

    }
    
  }
  const validate=()=>{
    const newerrors = {};
    if (!name ) {
      newerrors.name = "Name Required!!!";
    }
    if (!description) {
      newerrors.description = "Description Required!!!";
    }

    return newerrors;
  }
  return (
    <Form onSubmit={e=>handleForm(e)}>
        <h1>Category Form</h1>
        <Status>{errors.status}</Status>
        <Label htmlFor='item-name'>Item Name</Label>
        <Input id="item-name" type="text" onChange={e=>setName(e.target.value)} placeholder='Category Name'/>
        <span>{errors.name}</span>
        <Label htmlFor="description">Description</Label>
        <TextArea id="description" onChange={e=>setdescription(e.target.value)} cols="40" rows="5" placeholder='Description'></TextArea>
        <span>{errors.description}</span>

        <Submit type='submit' value="Save"></Submit>
    </Form>
  )
}

export const Status = styled.span`
color:yellow;
font-weight:300;
font-size:1.3rem;
padding:1rem 2rem;
border-radius:1rem;
margin:2rem;
`

const Submit = styled.input`
margin:0.5rem;
padding:2rem 4rem;
border:none;
border-radius:1rem;
font-size:1.2rem;
`
const Label = styled.label`
display:inline;
margin:0.5rem;
padding:0.5rem;
`
export const TextArea = styled.textarea`
border-radius:1rem;
padding:1rem;
margin:1rem;
width:25rem;
`

export default CategoryForm