import axios from "axios";
import { useEffect } from "react";


export default function Balance({ label, amount}) {

 
    return (
        <>
        <div className="flex mt-8">
            <div className="ml-5 text-2xl font-bold mr-5"> Your Balance</div>
            <div className="text-2xl"> $ {amount}</div>
        </div>
        </>
    );
}
