import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { webUser } from "@/utils/axios";
import { useToken } from "@/utils/token"

const LoginAdmin = ({setToken,setUser,user ,setRole}) =>{
    const navigate = useNavigate()

    const[username,setUsername]=useState(null)
    const[password,setPassword]=useState(null)

    const [alertData,setAlertData] = useState('')
    const [falseAlert,setFalseAlert] = useState(true)
    const [trueAlert,setTrueAlert] = useState(true)

    const onLogin = async (e,data) => {
        e.preventDefault();

        const response = await webUser.post('loginAdmin',data)

        if(response.data.success){
            setToken(response.data._token)
            setUser(response.data.data[0])
            setRole(response.data.data[0].role)
            console.log(response);
            console.log(user);
            navigate('/admin')
            
        }else{
            setFalseAlert(false)
            setAlertData(response.data.data)
        }

    }

    return(
        <div>
            {!falseAlert &&
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Danger !</span> {alertData}
                </div>
            </div>}
            {!trueAlert &&
            <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Success !</span> {alertData}
                </div>
            </div>}
        <div className="w-[450px] m-auto rounded-2xl my-[15%] bg-white/30">
            <form className="w-full p-[50px] ">
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Admin user</label>
                    <input type="text" onChange={(v)=>{setUsername(v.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="admin_user" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                    <input type="password" onChange={(v)=>setPassword(v.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="••••••••" required />
                </div>
                <button type="submit" onClick={(e) => {onLogin(e, { username, password })}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default LoginAdmin