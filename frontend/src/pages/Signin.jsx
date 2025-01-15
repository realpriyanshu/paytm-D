import Heading from '../components/Heading.jsx'
import Subheading from '../components/Subheading.jsx'
import Inputbox from '../components/Inputbox.jsx'
import Btn  from '../components/Button.jsx'
import BottomWarning from '../components/BottomWarning.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'




export default  function Signin(){
    const navigate = useNavigate();
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("")

    return(
        <>
        <div className="flex flex-col md:flex-row items-center justify-evenly h-screen">
            <div className=''><Heading label = "Sign In" /></div>
            
            <div >
        <Subheading label = "Enter your information to access your account" />

        <Inputbox label={"Email"} onchange={(e)=>{
            setUsername(e.target.value);
        }}  />
        <Inputbox label={"Password"} onchange={(e)=>{
            setPassword(e.target.value);
        }} />
        <Btn label={"Sign Up"}  onClick={async()=>{

     const resp =   await     axios.post("http://localhost:5000/user/signin",{
                username,
                password
            }).then(()=>{
                
                navigate("/dashboard")
            }).catch((e)=>{
                console.log(e);
            })

            console.log(resp.data)
        }}/>
        <BottomWarning label={"Doesn't have any account ?"} to={"/"} Bottomtext={"Sign Up"} />
            </div>
        
        </div>
       
</>
    )
}