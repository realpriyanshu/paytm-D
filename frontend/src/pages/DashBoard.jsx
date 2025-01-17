import { useState ,useEffect } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";




export default function Dashboard(){

    const [bal , setBal] = useState(0);

    useEffect(()=>{
        const fetchBalance = async () => {
            try {
              const response = await axios.get("http://localhost:5000/account/balance", {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              });

              const balance = await response.data.balance;
              setBal(Math.floor(balance))
              console.log("Balance:", response.data); // Handle the fetched balance here
            } catch (error) {
              console.error("Error fetching balance:", error);
            }
          };
      
          fetchBalance();
        
       },[])

  
return (
    <>
    <AppBar />
    <Balance amount={bal} />
    <Users />
    </>
)


}