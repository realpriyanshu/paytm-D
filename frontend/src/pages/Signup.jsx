import Heading from '../components/Heading.jsx'
import Subheading from '../components/Subheading.jsx'
import Inputbox from '../components/Inputbox.jsx'
import Btn  from '../components/Button.jsx'
import BottomWarning from '../components/BottomWarning.jsx'
import Signin from './Signin.jsx'
import { useState } from 'react'


import axios from 'axios'
import {  useNavigate } from 'react-router-dom'




export default  function SignUp(){

    const [firstName , setFirstname ] = useState("");
    const [lastName , setLastname ] = useState("");
    const [username , setUsername ] = useState("");
    const [password , setPassword ] = useState("");
    const navigate = useNavigate();
    return(
        <>
        <div className="flex flex-col md:flex-row items-center justify-evenly h-screen">
            <div className=''><Heading label = "Sign Up" /></div>
           
            <div >
        <Subheading label = "Enter your information to create your account" />
        <Inputbox label={"First Name"} onchange={(e)=>{

            setFirstname(e.target.value);

        }} />
        <Inputbox label={"Last Name"} onchange={(e)=>{setLastname(e.target.value);
}}  />
        <Inputbox label={"Email"}  onchange={(e)=>{setUsername(e.target.value);
}} />
        <Inputbox label={"Password"}  onchange={(e)=>{setPassword(e.target.value);
}}  />
        <Btn label={"Sign Up"} onClick={async()=>{
            
           
            const user = {
                firstName,
               lastName,
               password,
               username
            }
          const response = await  axios.post(`${import.meta.env.VITE_REACT_APP_BASEURL}/user/signup`, user)
              
       
          localStorage.setItem("token", response.data.token);
          console.log(response.data.token)
          navigate("/dashboard")
         
         
        }} />
        <BottomWarning label={"Already have an account ?"} to={"/Signin"} Bottomtext ={"Signin"} />
            </div>
        
        </div>
       
</>
    )
}