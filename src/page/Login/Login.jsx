import React from "react"; 
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Menu,Dropdown } from "@/components"
import { Home} from "@/page"
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

import bgImg from '@/assets/img/other/cute-pet-collage-isolated.jpg'
import { useState } from "react";
import { webUser } from "@/utils/axios";
import { useToken } from "@/utils/token"


const Login = ({setToken,setUser,user ,setRole}) => {

    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const [falseAlert,setFalseAlert] = useState(true)
    const [alertData,setAlertData] =useState('')

    const onLogin = async (e,data) => {
        e.preventDefault();
        onClearError()

        const response = await webUser.post('login',data)

        if(response.data.success){
            setToken(response.data._token)
            setUser(response.data.data[0])
            setRole(response.data.data[0].role)
            console.log(response);
            console.log(user);
            navigate('/')
            
        }else{
            setFalseAlert(false)
            setAlertData(response.data.data)
        }

    }

    const onClearError = () => {
        setFalseAlert(true)
        setAlertData('')
    }

return(
    <div className="md:h-screen bg-[#7DC5E5] ">
            <Menu />
            {!falseAlert &&
            <div class="flex items-center w-[50%] z-50 m-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-[#9B1C1C]/30" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Danger !</span> {alertData}
                </div>
            </div>
            }
            <div className="bg-[#7DC5E5]">
            <div className="flex justify-center relative rounded-xl m-auto mt-[4em] p-[2em] w-[400px] h-[700px] bg-white" style={{backgroundImage:`url(${bgImg})`, backgroundSize:"350px",backgroundPosition:"center 100%", backgroundRepeat:"no-repeat"}}>
                <form className="flex w-full flex-col gap-4">
                    <div>
                        <div className="text-xl font-bold mb-[1em]">Login</div>
                        <div className="mb-2 block">
                        <Label
                            value="Username"
                        />
                        </div>
                        <TextInput
                        placeholder="username"
                        required
                        type="text"
                        onChange={(v)=>{setUsername(v.target.value)}}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label
                            value="Your password"
                        />
                        </div>
                        <TextInput
                        placeholder="••••••••"
                        required
                        type="password"
                        onChange={(v)=>{setPassword(v.target.value)}}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="flex items-center">
                        <p>Don't have an account ?</p><Link to="/register" className="text-lg font-semibold hover:text-[#0FACF1] hover:border-b">&nbsp;sign up</Link>
                       </div>
                    </div>
                    <Button type="submit" onClick={(e) => {onLogin(e, { username, password })}}>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    </div>
)
}

export default Login