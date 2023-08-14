import { webUser } from "@/utils"
import { data } from "autoprefixer"
import { TextInput, Label, Textarea, Button } from "flowbite-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const RegisterAd = () => {
    const[username,setUsername] = useState(null)
    const[password,setPassword] = useState(null)
    const[employee,setEmployee] =useState(null)
    const[code,setCode] = useState(null)
    
    const codeCheck = 'happy_pet'

    const[alertData,setAlertData] = useState('')
    const[alertTrue,setAlertTrue] = useState(false)
    const[alertFalse,setAlertFalse] = useState(false)

    const onRegister = async (e,data) => {

        const response = await webUser.post('registerAdmin',{username,password,employee_id:employee})

        if(code!=='happy_pet'){
            setAlertData('Authorization invalid')
            setAlertFalse(true)
        }else if(username==''||password==''||employee==''||code==''){
            setAlertData('Put all Data')
            setAlertFalse(true)
        }else if(response.data.success){
            setAlertTrue(true)
            setAlertData("Register Success")
        }else{
            setFalseAlert(false)
            setAlertData(response.data.data)
        }
    }

    return(
        <div className="px-[3em] pb-[2em] bg-cyan">
                <form className="flex w-full flex-col gap-4 ">
                    <div className="text-xl font-bold">Create Admin Account</div>
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
                            onChange={(v)=>setUsername(v.target.value)}
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
                            onChange={(v)=>setPassword(v.target.value)}
                            />
                        </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                value="Employee"
                            />
                        </div>
                        <TextInput
                            placeholder="Employee ID"
                            required
                            shadow
                            type="text"
                            onChange={(v)=>setEmployee(v.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                value="Code"
                            />
                        </div>
                        <TextInput
                            placeholder="Authorization code"
                            required
                            shadow
                            type="text"
                            onChange={(v)=>setCode(v.target.value)}
                        />
                    </div>
                    <Button className="opacity-80 mt-[2em]" type="submit" onClick={onRegister}>
                        Register new account
                    </Button>
                </form>
        </div>
    )
}

export default RegisterAd