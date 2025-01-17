import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function Send() {
  const [amount, setAmount] = useState(0);
  const [showvideo , setShowvideo] = useState(false);
  const [ searchParams] =useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  


  return (
    <>
      <div className="flex bg-slate-200 items-center justify-center h-screen">
        <div className="h-auto w-96 flex flex-col items-center bg-white shadow-lg rounded-2xl p-6">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-6">
            
            <div className="h-10 w-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-lg">
              {name[0]}
            </div>
            <div className="text-gray-700 font-medium text-lg">{name}</div>
          </div>

          {/* Amount Input */}
          <div className="w-full mb-4">
            <label className="block text-gray-500 text-sm mb-2">
              Amount (in Rupees) 
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Transfer Button */}
          <button onClick={()=>{
             axios.post("http://localhost:5000/account/transfer",{
                to:id,
                amount
            },{
                headers:{
                    Authorization:"Bearer "+localStorage.getItem("token")
                }
            }).then(()=>{
                console.log("transferred")
                setShowvideo(true)
               
            }).catch((e)=>{
                console.log("server down")
            })
          }} className="bg-green-500 text-white text-sm h-10 w-full rounded-lg hover:bg-green-600 transition duration-200">
            Initiate Transfer
          </button>
          
        </div>
      </div>
    </>
  );
}
