import { Input } from '../components/Input'
import { LoginButton } from '../components/LoginButton'
import { Form } from '../components/Form'
import { Hr } from '../components/Hr'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useState,useContext } from 'react'
import {auth} from '../firebase-config'
import { AuthContext } from '../App'
import { useNavigate } from 'react-router-dom'
function LoginScreen() {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = ()=>{
    const newErrors = validate();
    if (Object.keys(newErrors).length===0){
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const userdata = {'email':user.email,"uid":user.uid,"idToken":user.getIdToken,loggedIn:true};
      authContext.setuser(userdata);
      localStorage.setItem('user',userdata)
      console.log(user);
      navigate('/dashboard')
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.table(error)
      newErrors.status = "Invalid Credentials";
      setErrors(newErrors);
    });
    }
    else{
      setErrors(newErrors)
    }
    
  }
  const validate = ()=> {
    const newErrors = {}
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  }
  return (
    <>
    <Form onSubmit={e=>{e.preventDefault()}}>
        <h1>Login with Credentials</h1>
        <span>{errors.status}</span>
        <Hr/>
        <Input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <span>{errors.email}</span>
        <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <span>{errors.password}</span>
        <LoginButton onClick={e=>handleLogin()}>Login</LoginButton>
    </Form>
    </>
  )
}

export default LoginScreen