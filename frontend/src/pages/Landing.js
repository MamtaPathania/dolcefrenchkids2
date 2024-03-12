import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import classes from "../pages/Landing.module.css";
import img2 from '../assets/Toonflix (9).png';
import axios from "axios";

// import { BsPersonCircle } from 'react-icons/bs'
// import axios from 'axios'
// import {requestPin}  from "../api/api";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
  const[messagenumber,setMessageNumber]=useState(false)

  const[message,setmessage]=useState(false)

console.log(message)
  const [value,setValue]=useState({
    number:'',
  })
  console.log("value",value)
    const notifyerror = (result) => toast.error(result);

  const navigate = useNavigate();
  const handleChange=(e)=>{
    const enteredNumber = e.target.value;
  const formattedNumber = enteredNumber.startsWith("0") ? enteredNumber : `0${enteredNumber}`;

    setValue({...value,
    // [e.target.name]:e.target.value
    [e.target.name]:formattedNumber

    })
  }


  
const data={
  MSISDN:value.number
}


  const handleClick=(e)=>{
    e.preventDefault();
    if (!value.number) {
      setMessageNumber(true);
      return; // Stop further execution if number is not entered
    }
    axios.post('https://oor.toon-flix.com/api/login',data)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("MSISDN",value.number)
         setmessage(false)
         setMessageNumber(false)
        navigate('/video');
      } else {
        console.log('Errorrrrr:', res.data);
      
        // alert("login failed")
      }
    })
    .catch((err) => {
      console.log('Error:', err);
      // alert(err.response.data.message)
      notifyerror(err.response.data.message)
      setmessage(true)
      setMessageNumber(false)

    });
    setValue('')
  }

  return (
    <>
     <style>
    {`
          .Toastify__toast {
            font-size: 14px;
            color:#0C0C0D 
          }
        `}
    </style>
    
   <ToastContainer/>
    <div className={classes.container}>
      <div className={classes.form_wrapper}>
        <img src={img2} className={classes.img_left}/>
        
        {/* <img src="/assets/img1.png" className={classes.img_left} /> */}
        <div className={classes.form_wrapper_left}>
          {/* <h1>Enter Your Number</h1> */}
          <form
          className={classes.form_signup}>

            <div className="bg-gray-100 px-8 rounded-lg shadow-2xl shadow-blue-400">
            {/* <BsPersonCircle size={70} color="blue"/> */}

            <h1 className="lg:px-16 px-40 text-red-900">Toonflix</h1>
            <div className="flex flex-col items-center">
              {
                message==true?<h2 className="text-red-600 lg:text-2xl text-lg lg:mb-2">• Insufficient credit please top-up.</h2>:null
              }
            {
                messagenumber==true?<h2 className="text-red-500 lg:text-2xl text-lg lg:mb-2 font-mono">Please Enter Number</h2>:null
              }
           
            <label className='lg:text-2xl text-xl'>Enter Number:</label>
            <input type="text"
            
            placeholder="Enter Number"
            name="number"
            value={value.number}
            onChange={handleChange}
             className="border mt-2 border-black lg:text-xl  text-2xl lg:p-2 hover:border-blue-300 lg:w-[180px] lg:h-[25px] w-[160px] h-[30px] lg:mb-8 mb-6"/>
            </div>
           
            
            <button 
            // className={classes.form_btn}
            className="bg-blue-600 rounded lg:w-[100px] lg:h-[40px] lg:text-xl w-[70px] h-[45px] text-2xl text-white"
            // onClick={()=>navigate('/unsubscribe')}
            type="button"
            onClick={handleClick}
            >
              Login
            </button>
            <p className="lg:mt-8 lg:text-2xl mt-4 text-xl">-OR-</p>
            <p className="lg:mt-1 lg:text-2xl mt-2 text-xl">Do You Want TO Subscribe?</p>
            <button
              // className={classes.form_btn}
              className="bg-blue-600 lg:mt-6 rounded lg:w-[100px] lg:h-[40px] lg:text-xl w-[70px] h-[45px]  text-2xl text-white mb-6 mt-4"
             
              onClick={()=>navigate('/subscribe')}
              type="button"
            >
              Subscriber
            </button>
            
            </div>
          </form>
          <p
          style={{
            direction: "rtl"
          }}
          className="lg:text-2xl text-2xl text-right text-black lg:mt-8 mt-12 lg:mx-6 ">
         
  -Toonflix خدمة متميزة توفر العديد من العاب الرسوم المتحركة للأطفال. تنطبق هذه الخدمة على مستخدمي جوال وأوريدو. حيث تبلغ تكلفة الخدمة 1 شيكل ش.ض. تجدد يوميا ولإلغاء الإشتراك أرسل unsub oo  برسالة مجانية إلى الرقم 37637 لمستخدمي جوال و الى الرقم 7902 لمستخدمي اوريدو. يتم تجديد الخدمة تلقائيًا ما لم يتم إلغاؤها. 

          </p>
        </div>
       
      </div>
      
    </div>
    {/* <div className="lg:text-xl lg:mx-8">
          
  -Toonflix خدمة متميزة توفر العديد من العاب الرسوم المتحركة للأطفال. تنطبق هذه الخدمة على مستخدمي جوال وأوريدو. حيث تبلغ تكلفة الخدمة 1 شيكل ش.ض. تجدد يوميا ولإلغاء الإشتراك أرسل unsub oo  برسالة مجانية إلى الرقم 37637 لمستخدمي جوال و الى الرقم 7902 لمستخدمي اوريدو. يتم تجديد الخدمة تلقائيًا ما لم يتم إلغاؤها. 
          </div> */}
    </>
  );
};

export default LandingPage;

