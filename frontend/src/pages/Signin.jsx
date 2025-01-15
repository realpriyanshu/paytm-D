import Heading from '../components/Heading.jsx'
import Subheading from '../components/Subheading.jsx'
import Inputbox from '../components/Inputbox.jsx'
import Btn  from '../components/Button.jsx'
import BottomWarning from '../components/BottomWarning.jsx'




export default  function Signin(){
    return(
        <>
        <div className="flex flex-col md:flex-row items-center justify-evenly h-screen">
            <div className=''><Heading label = "Sign In" /></div>
            
            <div >
        <Subheading label = "Enter your information to access your account" />

        <Inputbox label={"Email"}  />
        <Inputbox label={"Password"}  />
        <Btn label={"Sign Up"} />
        <BottomWarning label={"Doesn't have any account ?"} to={"/Signup"} Bottomtext={"Sign Up"} />
            </div>
        
        </div>
       
</>
    )
}