import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { webUser,useToken } from "@/utils";


const Dropdown = ({setToken,setUser,user ,setRole}) =>{

    const [username,setUsername]=useState(null)
    const [password,setPassword] = useState(null)

    const[alertData,setAlertData] = useState('')
    const[alertTrue,setAlertTrue] = useState(false)
    const[alertFalse,setAlertFalse] = useState(false)

    const onLogin = async (e,data) => {
        const response = await webUser.post('/login',data)
        if(username==''||password==''){
            setAlertData('Put all Data')
            setAlertFalse(true)
        }else if(response.data.success){
            setAlertTrue(true)
            setAlertData("Register Success")
            setToken(response.data._token)
            setUser(response.data.data[0])
            setRole(response.data.data[0].role)
        }else{
            setFalseAlert(false)
            setAlertData(response.data.data)
        }
    }
    
    return(
      <div>
          <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in </h3>
                    <div>
                        <div className="mb-2 block">
                            <Label  value="username" />
                        </div>
                    <TextInput onChange={(e) => setUsername(e.target.value)} id="id" placeholder="username" required />
                    </div>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                </div>
                <TextInput onChange={(e) => setPassword(e.target.value)} id="password" placeholder='••••••••' type="password" required />
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