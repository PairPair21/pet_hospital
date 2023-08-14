import { Menu } from "@/components"
import React,{ useState,useEffect } from "react"

import { Button, Checkbox, Label, TextInput, Textarea, Modal } from 'flowbite-react';
import { Link } from "react-router-dom";

import bgImg from '@/assets/img/other/cute-pet-collage-isolated.jpg'
import {webUser} from "@/utils/axios"



const Register = ({user}) =>{

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [fullname,setFullname] = useState('')
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [address,setAddress] = useState('')

    const [trueAlert,setTrueAlert] = useState(true)
    const [falseAlert,setFalseAlert] = useState(true)
    const [alertData,setAlertData] =useState('')
    
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    const onRegister = async (e,data)=>{

        onClearError()
        e.preventDefault();

        const response = await webUser.post('register',data)

        if(username&&password&&fullname){        
            if(response.data.success){
                setTrueAlert(false)
            }else{
                setFalseAlert(false)
                setAlertData(response.data.data)
            }
        }else{
            setFalseAlert(false)
            setAlertData('Need to Fill Important Information')
        }

    }
    
    const onClearError = () => {
        setTrueAlert(true)
        setFalseAlert(true)
        setAlertData('')
    }

    
    return(
        <div className="md:h-screen bg-[#7DC5E5] ">
            <Menu user={user} />
            { !trueAlert &&
            <div class="flex items-center w-[50%] z-50 m-auto p-4 mb-4 text-sm text-green-800 rounded-lg bg-[#31C48D]/50 " role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Success !</span> Sign-up Success.
                </div>
            </div>}
            { !falseAlert &&
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
            <div className="flex justify-center relative rounded-xl m-auto mt-[2em] p-[2em] w-[400px] h-[770px] bg-white" style={{backgroundImage:`url(${bgImg})`, backgroundSize:"350px",backgroundPosition:"center 100%", backgroundRepeat:"no-repeat"}}>
                <form className="flex w-full flex-col gap-4 ">
                    <div className="text-xl font-bold">Create and account</div>
                    <div>
                        <div className="mb-2 block">
                        <Label
                            value="Username"
                        />
                        </div>
                        <TextInput
                            placeholder="username"
                            required
                            shadow
                            type="text"
                            onChange={(v)=>{setUsername(v.target.value),onClearError()}}
                        />
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label
                                value="Password"
                            />
                            </div>
                            <TextInput
                            placeholder="••••••••"
                            required
                            shadow
                            type="password"
                            onChange={(v)=>{setPassword(v.target.value),onClearError()}}
                            />
                        </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                value="Full name"
                            />
                        </div>
                        <TextInput
                            placeholder="firstname lastname"
                            required
                            shadow
                            type="text"
                            onChange={(v)=>{setFullname(v.target.value),onClearError()}}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                value="Phone"
                            />
                        </div>
                            <TextInput
                            placeholder="081-000-0000"
                            required
                            shadow
                            type="text"
                            onChange={(v)=>{setPhone(v.target.value),onClearError()}}
                            />
                        </div>
                    <div>
                        <div className="mb-2 block">
                        <Label
                            value="E-mail"
                        />
                        </div>
                        <TextInput
                        placeholder="name@email.com"
                        required
                        shadow
                        type="email"
                        onChange={(v)=>{setEmail(v.target.value),onClearError()}}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label
                            value="Address"
                        />
                        </div>
                        <Textarea
                            placeholder="111 aaa Road, ccc, bbb District, Bkk 10000 "
                            required
                            shadow
                            type="comment"
                            onChange={(v)=>{setAddress(v.target.value),onClearError()}}
                        />
                    </div>
                    <span className="flex text-black font-base drop-shadow-md items-center">
                        <p>Already have Accout?</p> <Link className="text-lg font-semibold hover:text-[#0FACF1] hover:border-b" to="/login">&nbsp;Login</Link>
                    </span>
                    <Button className="opacity-80" type="submit" onClick={(e) => {onRegister(e, 
                        { username: username, password: password, fullname: fullname, phone: phone, email: email, address: address }
                        ),onClearError()}} >
                        Register new account
                    </Button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Register