import "./Auth.css";
import { useAuth } from "../../context";
import { validateEmail, validateName, validateNumber, validatePassword } from "../../utils";

import { signupHandler } from "../../services";

let isEmailValid, isConfirmPasswordValid, isNameValid, isNumberValid, isPasswordValid;
export const AuthSignup = () => {

    const { username,
        email,
        password,
        number, authDispatch, confirmPassword } = useAuth();
    console.log(username,
        email,
        password,
        number, confirmPassword);
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
    const handleNameChange = (e) => {
        isNameValid = validateName(e.target.value);
        if (isNameValid) {

            authDispatch({
                type: "NAME",
                payload: e.target.value
            })
        } else {
            console.log("Invalid Name");
        }
    }
    const handleEmailChange = (e) => {
        isEmailValid = validateEmail(e.target.value);
        if (isEmailValid) {

            authDispatch({
                type: "EMAIL",
                payload: e.target.value
            })
        } else {
            console.log("Invalid Email");
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
    const handleConfirmPasswordChange = (e) => {
        isConfirmPasswordValid = validatePassword(e.target.value);
        if (isConfirmPasswordValid) {

            authDispatch({
                type: "CONFIRM_PASSWORD",
                payload: e.target.value
            })
        } else {
            console.log("Invalid confirm password");
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isEmailValid && isConfirmPasswordValid && isNameValid && isNumberValid && isPasswordValid) {
            signupHandler(username, number, email, password);
        }
        authDispatch({
            type:"CLEAR_USER_DATA"
        })
    }
    return (
        <div className="auth-container">
            <form onSubmit={handleFormSubmit}>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Mobile Number<span className="asterisk">*</span></label>
                    <input defaultValue={number} type="number" className="auth-input" placeholder="Enter Mobile Number" maxLength="10" required onChange={handleNumberChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Name<span className="asterisk">*</span></label>
                    <input defaultValue={username} type="name" className="auth-input" placeholder="Enter Name" required onChange={handleNameChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Email<span className="asterisk">*</span></label>
                    <input defaultValue={email} type="email" className="auth-input" placeholder="Enter Email" required onChange={handleEmailChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Password<span className="asterisk">*</span></label>
                    <input defaultValue={password} type="password" className="auth-input" placeholder="Enter Password" required onChange={handlePasswordChange} />
                </div>
                <div className="d-flex direction-column lb-in-container">
                    <label className="auth-label">Confirm Password<span className="asterisk">*</span></label>
                    <input defaultValue={confirmPassword} type="password" className="auth-input" placeholder="Enter Confirm Password" required onChange={handleConfirmPasswordChange} />
                </div>
                <div>
                    <button className="button btn-primary btn-login cursor" >Submit</button>
                </div>
            </form>

        </div>
    )
}