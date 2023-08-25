import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { webUser,useToken } from "@/utils";


const Dropdown = ({setToken,setUser,user ,setRole}) =>{

    const [username,setUsername]=useState(null)
    const [password,setPassword] = useState(null)

    const[alertData,setAlertData] = useState('')
    const[falseAlert,setFalseAlert] = useState(false)

    const onLogin = async (e,data) => {
        const response = await webUser.post('/login',data)
        if(username==''&&password==''){
            setAlertData('put all data')
            setFalseAlert(true)
        }else if(response.data.success){
            setToken(response.data._token)
            setUser(response.data.data[0])
            setRole(response.data.data[0].role)
        }else{
            setFalseAlert(true)
            setAlertData(response.data.data)
        }
    }

    const onClearError = () => {
        setFalseAlert(false)
        setAlertData('')
    }
    
    return(
      <div>
        {falseAlert &&
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">Danger !</span> {alertData}
            </div>
        </div>}
        <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in </h3>
                    <div>
                        <div className="mb-2 block">
                            <Label  value="username" />
                        </div>
                    <TextInput onChange={(e) => {setUsername(e.target.value),onClearError()}} id="id" placeholder="username" required />
                    </div>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                </div>
                <TextInput onChange={(e) => {setPassword(e.target.value),onClearError()}} id="password" placeholder='••••••••' type="password" required />
                </div>
                <div className="w-full">
                    <Button className='w-full my-[2em]' onClick={(e)=> {onLogin(e, {username,password})}}>Log in</Button>
                    <div className="text-sm ">For Administrator <Link className="text-cyan-700 hover:underline dark:text-cyan-500" to={'/admin'}> Click here</Link></div>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?&nbsp;
                    <Link to={'/register'} className="text-cyan-700 hover:underline dark:text-cyan-500">
                        Create account
                    </Link>
                </div>
            </div>
          </Modal.Body>
        </div>
    )
}

export default Dropdown