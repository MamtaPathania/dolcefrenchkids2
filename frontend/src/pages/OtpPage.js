import React, { useState } from "react";
import classes from "./Otp.module.css";
import OtpInput from "react-otp-input";
import { validatePin } from "../api/api";
import axios from 'axios';
import { useNavigate } from "react-router-dom/dist";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const notifySuccess = (result) => toast.success(result);
  const notifyError = (result) => toast.error(result);

  const loginApiCall = async (number) => {
    const loginData = {
      MSISDN: number,
      // Add other necessary data for login if required
    };

    try {
      const loginResponse = await axios.post('https://oor.toon-flix.com/api/login', loginData);
      console.log(loginResponse);

      if (loginResponse.status === 200) {
        localStorage.setItem("MSISDN", number);
        setTimeout(() => {
          navigate("/video");
        }, 2000);
      } else {
        console.log('Logining Error:', loginResponse.data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        // Handle login error if needed
      }
    } catch (loginError) {
      console.log('Login Error:', loginError);
      // notifyError(loginError.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const submitHandler = async () => {
    setLoading(true)
    const number = localStorage.getItem("MSISDN");

    const data = {
      MSISDN: number,
      PIN: otp,
    };

    try {
      const response = await axios.post(`${validatePin}`, data);
      console.log(response);

      if (response.status === 200) {
        notifySuccess(response.data.result.MessageEn);
         loginApiCall(number); // Invoke login API call

       
      }
    } catch (err) {
      console.log("Error:", err);
      notifyError(err.response.data.message.MessageEn);

    }finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }

    console.log(otp, 'otp');
  };

  return (
    <>
    <style>
    {`
          .Toastify__toast {
            font-size: 14px;
            color:#0C0C0D /* Adjust the font size as needed */
          }
        `}
    </style>
     
      <ToastContainer />
      <div className={classes.container}>
        <div className={classes.sub_container}>
          <div className={classes.heading}>
            <h4>Enter the OTP</h4>
          </div>
          <div className={classes.input_container}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span style={{ color: "white", padding: "0 0.5rem 0 0.5rem" }}></span>}
              inputStyle={{
                width: "6rem",
                height: "5rem",
                fontSize: "2rem",
              }}
              renderInput={(props) => (
                <input
                  {...props}
                  type="number"
                />
              )}
            />
          </div>
          {loading ? (
                <div className="text-center text-white">
                  <Spinner/>
                </div>
              ) : (
                <button
            className={classes.btn}
            onClick={submitHandler}
            id='evina_ctabutton'
            type="submit"
          >
            Validate
          </button>
              )}
          {/* <button
            className={classes.btn}
            onClick={submitHandler}
            id='evina_ctabutton'
            type="submit"
          >
            Validate
          </button> */}
        </div>
      </div>
    </>
  );
};

export default OtpPage;



// import React, {  useState } from "react";
// import classes from "./Otp.module.css";
// import OtpInput from "react-otp-input";
// import { validatePin } from "../api/api";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom/dist";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const OtpPage = () => {
//   const [otp, setOtp] = useState("");
//   const navigate=useNavigate()
//   const notifySuccess = (result) => toast.success(result);
//   const notifyerror = (result) => toast.error(result);

//   const submitHandler=async()=>{
//     const number=localStorage.getItem("MSISDN")

    
//     const data={
//       MSISDN:number,
//       PIN:otp
//      }
// try{
//   const response= await axios.post(`${validatePin}`,data)
//   console.log(response)

//   if(response===200)
//   notifySuccess(response.data.result.MessageEn)



//   const loginData = {
//     MSISDN: number,
//   };

//   axios.post('http://192.168.1.22:5522/api/login', loginData)
//   .then((loginRes) => {
//     console.log(loginRes);
//     if (loginRes.status === 200) {
//       localStorage.setItem("MSISDN", number);
//       navigate('/video');
//     } else {
//       console.log('Login Error:', loginRes.data);
//       // Handle login error if needed
//     }
//   })
//   .catch((loginErr) => {
//     console.log('Login Error:', loginErr);
//     // notifyError(loginErr.response.data.message);
//   });


//   setTimeout(() => {
//     navigate("/video");
//   }, 3000);


//   // navigate('/')
// }catch(err){console.log("error",err)
// notifyerror(err.response.data.message.MessageEn)
// }
//     console.log(otp,'otp')
    
//   }

//   return (
//     <>
//     <ToastContainer />
//     <div className={classes.container}>
//       <div className={classes.sub_container}>
//         <div className={classes.heading}>
//           <h4>Enter the OTP</h4>
//         </div>
//         <div className={classes.input_container}>
//           <OtpInput
//             value={otp}
//             onChange={setOtp}
//             numInputs={4}
//             renderSeparator={<span style={{color:"white",padding:"0 0.5rem 0 0.5rem"}}></span>}
//             inputStyle={{
//               width: "6rem", 
//               height: "5rem",
//               fontSize: "2rem", 
//             }}
//             renderInput={(props) => (
//               <input
//                 {...props}
//                 //   className={`${classes.input_box}`}
//                 type="number"
//               />
//             )}
//           />
//         </div>

//         <button
//           className={classes.btn}
//           onClick={submitHandler}
//           id='evina_ctabutton' 
//           type="submit"
//         >
//           Validate
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default OtpPage;
