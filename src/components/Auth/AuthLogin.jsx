import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { validateNumber,validatePassword } from "../../utils";
import { useAuth } from "../../context";
import {loginHandler} from "../../services";
let isNumberValid,isPasswordValid;
export const AuthLogin=()=>{
    const navigate=useNavigate();
  const {authDispatch,number,password}=useAuth();

  const handleNumberChange = (e) => {
        isNumberValid = validateNumber(e.target.value);
        if (isNumberValid) {
            authDispatch({
                type: "NUMBER",
                payload: e.target.value
            })
        } else {
            console.log("INVALID NUMBER");
        }

    }


     const handlePasswordChange = (e) => {
            isPasswordValid = validatePassword(e.target.value);
            if (isPasswordValid) {
                console.log("valid password")
                authDispatch({
                    type: "PASSWORD",
                    payload: e.target.value
                })
            } else {
                console.log("INvalid Password");
            }
        }

const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (isNumberValid && isPasswordValid) {
    try {
      const { accessToken, username } = await loginHandler(number, password);

      authDispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
      authDispatch({ type: "SET_USER_NAME", payload: username });
      authDispatch({ type: "CLEAR_USER_DATA" });
      authDispatch({ type: "SHOW_AUTH_MODAL" });
      navigate("/");
    } catch (error) {
      alert("Invalid credentials"); // ✅ This will now run on login failure
      console.error("Login failed:", error);
    }
  } else {
    alert("Please enter valid number and password.");
  }
};











const handleTestCredentialsClick=async()=>{
  const {accessToken,username}=await loginHandler(number,password);
  authDispatch({
            type:"SET_ACCESS_TOKEN",
            payload:accessToken
           })
            authDispatch({
            type:"SET_USER_NAME",
            payload:username
           })
            authDispatch({
            type:"CLEAR_USER_DATA"
        })
        authDispatch({
            type:"SHOW_AUTH_MODAL"
        })
}




   return(
    <div className="auth-container"> 
        <form onSubmit={handleFormSubmit}>
            <div className="d-flex direction-column lb-in-container">
                <label className="auth-label">Mobile Number<span className="asterisk">*</span></label>
                <input defaultValue={number} type="number" className="auth-input" placeholder="Enter Mobile Number" maxLength="10"  required
                onChange={handleNumberChange}/> 
            </div>
            <div className="d-flex direction-column lb-in-container">
                <label className="auth-label">Password<span className="asterisk">*</span></label>
                <input defaultValue={password} type="password" className="auth-input" placeholder="Enter Password" required
                onChange={handlePasswordChange}/> 
            </div>
            <div>
                <button className="button btn-primary btn-login cursor">Login</button>
            </div>
        </form>
        <div className="cta" >
            <button className="button btn-outline-primary cursor-pointer" onClick={handleTestCredentialsClick}
            >Login with Test Credentials</button>
        </div>
    </div>
   )
}