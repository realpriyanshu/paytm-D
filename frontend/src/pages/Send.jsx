import { useState } from "react";
import axios from "axios";
import TickAnimation from '../animation/Animation - 1737216082962.gif'
import CrossAnimation from '../animation/cross.gif'
import { useSearchParams ,useNavigate } from "react-router-dom";

export default function Send() {
  const [amount, setAmount] = useState(0);
  const [showvideo , setShowvideo] = useState(false);
  const [showPopup , setShowPopup] = useState(false);
  const [showErr , setShowErr] = useState(false);
  const [ searchParams] =useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();


  return (
    <>
      <div className="flex bg-slate-200 items-center justify-center h-screen">
        <div className="h-auto w-96 flex flex-col items-center bg-white shadow-lg rounded-2xl p-6">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-6">
            
            <div className="h-10 w-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-lg">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="text-gray-700 font-medium text-lg">{name.charAt(0).toUpperCase() + name.slice(1)} </div>
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
                setShowPopup(true);
                
                
                
               
            }).catch((e)=>{
              setShowErr(true)
                console.log("server down")
            })
          }} className="bg-green-500 text-white text-sm h-10 w-full rounded-lg hover:bg-green-600 transition duration-200">
            Initiate Transfer
          </button>
          
        </div>
      </div>

      {showPopup &&(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded-lg shadow-lg "> 
            <div >
             <img src={TickAnimation}></img>
            </div>
            <h2 className="text-green-600 mb-5 ">
              <span className="font-bold"> {amount} $</span> Transfer succesfully !!
            </h2>
            <button className="h-8 w-40 rounded-lg bg-green-500" onClick={()=>{
              setShowPopup(false);
              navigate('/dashboard')
            }}>Go to dashboard</button>
          </div>
      </div>
        
      
      )}
       {showErr &&(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded-lg shadow-lg "> 
            <div >
             <img src={CrossAnimation}></img>
            </div>
            <h2 className="text-red-600 mb-5 ml-3  ">
             Transfer Failed! !!
            </h2>
            <button className="h-8 w-40 rounded-lg bg-green-500" onClick={()=>{
              setShowErr(false);
              navigate('/dashboard')
            }}>Go to dashboard</button>
          </div>
      </div>
        
      
      )}
      </>
    
  );
}
