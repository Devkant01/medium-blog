// import { signupType, signinType } from "@devkant01/zodvalidation"
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInput, setInput] = useState(type === "signup" ? { name: "", email: "", password: "" } : { email: "", password: "" });
    
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/medium-blog/user/${type === "signup" ? "signup" : "signin"}`, postInput);
            const jwt = response.data;
            localStorage.setItem("token", jwt.token);
            navigate(`/blogs`);  //path  that are in frontend
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold">{type === "signup" ? "Sign Up" : "Sign In"}</h1>
            </div>
            <div className="flex justify-center mt-5">
                <div className="w-96">
                    {type === "signup" && <LabeledInputBox label="Username" InputType="text" placeholder="Enter your name" onChange={(e) => { setInput({ ...postInput, name: e.target.value }) }} />}
                    <LabeledInputBox label="Email" InputType="email" placeholder="Enter your email" onChange={(e) => {
                        setInput({
                            ...postInput,
                            email: e.target.value
                        })
                    }} />
                    <LabeledInputBox label="Password" InputType="password" placeholder="Enter your password" onChange={(e) => {
                        setInput({
                            ...postInput,
                            password: e.target.value
                        })
                    }} />
                    <div className="mb-4">
                        <button onClick={sendRequest} className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-md">Submit</button>
                    </div>
                    <div className="w-full mb-4 ">
                        <Link to={type === "signup" ? "/signin" : "/signup"} className="w-full text-black font-semibold py-2 block text-end">{type === "signup" ? "Already have an account: Login" : "Don't have account: Signup"}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface labeledInput {
    label: string;
    InputType: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabeledInputBox({ label, InputType, placeholder, onChange }: labeledInput) {
    return (
        <div className="mb-4">
            <label className=" block text-sm font-medium text-gray-700">{label}</label>
            <input onChange={onChange} type={InputType} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" placeholder={placeholder ? placeholder : " "} />
        </div>
    )
}