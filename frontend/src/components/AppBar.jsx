import { useNavigate } from "react-router-dom";
import paytmLogo from "../assets/paytm-remove.png";
import greeting from "../animation/greeting.gif";

export default function AppBar({ firstLetter }) {
  const navigate = useNavigate();

  function changePage() {
    navigate("/signin");
  }

  return (
    <>
      <div className="flex justify-between  h-16 w-screen border-2 border-slate-300">
       
        <div className="ml-5 mt-1 h-16 w-16">
          <img src={paytmLogo} />
        </div>
        <div className="h-14 w-14 ">
          <img src={greeting}></img>
        </div>
        <div className="flex ml-2   mx-4">
          <div className="flex mt-2">
            {/* <div className="text-lg mt-2 mr-2">
                Hello  
            </div> */}

            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center  mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                U
              </div>
            </div>
            <div>
              <button
                className="h-6 w-16 text-red-600 font-semibold rounded-lg mt-2"
                onClick={changePage}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
