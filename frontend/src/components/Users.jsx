import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Btn from "./Button";

export default function Users(){
       
    const  [users , setUsers] = useState([]);
     const [filter , setFilter] = useState("");

useEffect(()=>{
 
axios.get("http://localhost:5000/user/bulk?filter=" + filter).then(
    (res)=>{
        setUsers(res.data.user);
        
    }
)

},[filter])

    return(
        <>

        <div className="text-lg font-bold mt-6 ">
            Users
        </div>
        <div className="my-2 ">
            <input onChange={(e)=>{
                setFilter(e.target.value);
            }} type="text" placeholder="Search users"  className="border h-8 w-52 rounded-lg pl-4"></input>
        </div>
        <div>
            {users.map(user => <User usr={user}/>)}
        </div>


        </>
    )
} 

function User({usr}){

   const  navigate = useNavigate();

   return(
   
    <div className="flex justify-between">
        <div className="flex mt-4">
        <div className="h-9 w-9 mr-2 rounded-full bg-slate-300 text-center">
            <div className="mt-1 ">{usr.firstName[0].toUpperCase()}</div>
        </div>

    <div className="font-semi-bold">
    <div>
        {usr.firstName.charAt(0).toUpperCase() + usr.firstName.slice(1)} {usr.lastName}
    </div>
</div>


        </div>
       
        <div>
            <Btn label={"Send Money"} onClick={(e)=>{
                navigate("/send?id="+usr._id +"&name="+ usr.firstName);
            }} />
        </div>

    </div>
    
 
   )

        

       
 




    }