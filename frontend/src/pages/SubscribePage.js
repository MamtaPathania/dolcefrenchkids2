
// import React, { useState} from "react";
// import { useNavigate } from "react-router-dom";
// import classes from "./Landing.module.css";
// import axios from 'axios'
// import {requestPin}  from "../api/api";
// import img from '../assets/img1.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Spinner from "./Spinner";



// const SubscribePage = () => {
//   const [number, setNumber] = useState("");
//   const [operator,setOperator]=useState('')
//   const [loading, setLoading] = useState(false);
//   console.log(number)
//   console.log("op===",operator)
//   const navigate = useNavigate();
//   const notifySuccess = (result) => toast.success(result);
//   const notifyerror = (result) => toast.error(result);

//   const submitHandler = async () => {
//     setLoading(true)
//     const data={
//       MSISDN:number,
//       OPERATOR:operator
//      }

//      console.log("data",data)
// try{
//   const response= await axios.post(`${requestPin}`,data)
//   console.log("=====",response)
//   if(response.status===200){
    
//     localStorage.setItem("MSISDN",number)
//     // navigate("/otp");
//     notifySuccess(response.data.result.MessageEn)
    
//     setTimeout(() => {
//       navigate("/otp");
//     }, 3000);

//   }
// }catch(err)
// {
//     console.log("error",err.response.data.message.MessageEn)
// notifyerror(err.response.data.message.MessageEn)
// }
// finally {
//   setLoading(false); // Reset loading state regardless of success or failure
// }
// };
// const setFormattedNumber = (value) => {
//   return value.startsWith("0") ? value : `0${value}`;
// };


//   return (
//     <>
//     <style>
//     {`
//           .Toastify__toast {
//             font-size: 14px;
//             color:#0C0C0D /* Adjust the font size as needed */
//           }
//         `}
//     </style>
    
//    <ToastContainer/>
//     <div className={classes.container}>
//       <div className={classes.form_wrapper}>
//       <img src={img} alt="subscribe" className={classes.img_left} />
//         <div className={classes.form_wrapper_left}>
//           <h1>Enter Your Number</h1>
//           <form className={classes.form_signup}>
//             <div className={classes.input_group}>
//               <input
//                 type="number"
//                 value={number}
//                 onChange={(e) => setNumber(e.target.value)}
//                 // onChange={(e) => setNumber(setFormattedNumber(e.target.value))}

//                 placeholder="Number"
//               />
              
//               {/* <i className="fa-solid fa-mobile" style={{fontSize:'2rem'}}></i> */}
//             </div>
//             <div className={classes.input_group}>
//             {/* <label className="flex justify-start text-blue-5 00 text-2xl">Select operator:</label>

// <select className="border border-blue-600 lg:w-[140px]">
//     <option className="lg:text-xl">
//       hjghjg
//     </option>
//     <option>hjj</option>
//   </select> */}
//   <label for="underline_select" className="sr-only border-blue-600">Underline select</label>
// <select id="underline_select" 
// value={operator}
//                 onChange={(e) => setOperator(e.target.value)}

// className="block py-2.5 px-0 w-[250px] lg:ml-[72px] text-2xl text-blue-500 bg-transparent border-0 border-b-2 border-blue-300 appearance-none dark:text-blue-300
//  dark:border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-300 peer">
  
//     <option >Select Operator</option>
    
//     <option value="JW">Jawwal</option>
//     <option value="WM">Ooredoo</option>
   
// </select>
//             </div>
            
// {/*             
//             <button
//               // className={classes.form_btn}
//               className="bg-blue-600 lg:mt-8 mt-12 rounded lg:w-[100px] lg:h-[40px] w-[90px] h-[30px] text-xl text-white"

//               onClick={submitHandler}
//               type="button"
//             >
//               Submit
//             </button> */}
//             {loading ? (
//                 <div className="text-center text-white">
//                   <Spinner />
//                 </div>
//               ) : (
//                 <>
//                 <p className="mt-7 lg:text-2xl text-blue-600">
//                 -Toonflix خدمة متميزة توفر العديد من العاب الرسوم المتحركة للأطفال
// </p>
//                 <button
//                   className="bg-blue-600 lg:mt-8 mt-12 rounded lg:w-[100px] lg:h-[40px] w-[90px] h-[30px] text-xl text-white"
//                   onClick={submitHandler}
//                   type="button"
//                 >
//                   Submit
//                 </button>
//                 </>
//               )}
            
//           </form>
          
      
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default SubscribePage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Landing.module.css";
import img from '../assets/Toonflix (9).png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";
import { requestPin } from "../api/api";

const SubscribePage = () => {
  const [number, setNumber] = useState("");
  const [operator, setOperator] = useState('JW'); 
  const [loading, setLoading] = useState(false);

  const notifySuccess = (result) => toast.success(result);
  const notifyError = (result) => toast.error(result);
  const navigate = useNavigate();

  const getNumberPrefix = () => {
    return operator === 'JW' ? '059' : operator === 'WM' ? '056' : '';
  };

  useEffect(() => {
    setNumber("");
  }, [operator]);

  const submitHandler = async () => {
    setLoading(true);
    const data = {
      MSISDN: number,
      OPERATOR: operator
    };

    console.log("data",data)
    try {
      const response = await axios.post(`${requestPin}`, data);
      if (response.status === 200) {
        localStorage.setItem("MSISDN", number);
        notifySuccess(response.data.result.MessageEn);
        setTimeout(() => {
          navigate("/otp");
        }, 3000);
      }
    } catch (err) {
      notifyError(err.response.data.message.MessageEn);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const enteredValue = e.target.value;
    const prefix = getNumberPrefix();

    if (enteredValue.startsWith(prefix)) {
      setNumber(enteredValue);
    } else {
      setNumber(prefix + enteredValue);
    }
  };

  return (
    <>
      <style>
        {`
          .Toastify__toast {
            font-size: 14px;
            color: #0C0C0D;
          }
        `}
      </style>
    
      <ToastContainer />
      
      <div className={classes.container}>
        <div className={classes.form_wrapper}>
          <img src={img} alt="subscribe" className={classes.img_left} />
          <div className={classes.form_wrapper_left}>
            <h1>Enter Your Number</h1>
            <form className={classes.form_signup}>
              <div className={classes.input_group}>
                <input
                  type="number"
                  value={number}
                  onChange={handleChange}
                  placeholder={`${getNumberPrefix()} Number`}
                />
              </div>
              <div className='gap-6'>
                <label className="text-blue-600 text-2xl lg:mr-[40px]">Select Operator:</label>
                <select className="border-2 border-blue-600 rounded-lg lg:px-8 lg:py-2 text-xl"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                >
                  <option value="JW">Jawwal</option>
                  <option value="WM">Ooredoo</option>
                </select>
              </div>
              <p style={{
            direction: "rtl"
          }}
              className="mt-7 mb-15 lg:text-2xl text-2xl text-blue-600 ">
                    -Toonflix خدمة متميزة توفر العديد من العاب الرسوم المتحركة للأطفال
                  </p>
              {loading ? (
                <div className="text-center text-white">
                  <Spinner />
                </div>
              ) : (
                <>
                  <button
                    className="bg-blue-600 lg:mt-8 mt-12 rounded lg:w-[100px] lg:h-[40px] w-[90px] h-[30px] text-xl text-white"
                    onClick={submitHandler}
                    type="button"
                  >
                    Submit
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribePage;
