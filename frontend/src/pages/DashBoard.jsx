import { useState ,useEffect } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";


export default function Dashboard(){

    const [bal , setBal] = useState(0);
    const [fLetter , setFLetter] = useState("");

    useEffect(()=>{
        const fetchBalance = async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASEURL}/account/balance`, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              });

              const balance = await response.data.balance;
              setBal(Math.floor(balance))
               
            } catch (error) {
              console.error("Error fetching balance:", error);
            }
          };
      
          fetchBalance();
        
       },[])

  
return (
    <>
    <AppBar firstLetter={fLetter}/>
    <Balance amount={bal} />
    <div className="mx-10">
    <Users />
    </div>
    
    </>
)


}