import { useToken, webUser } from "@/utils"
import { Label,Select,TextInput,Button,Radio } from "flowbite-react"
import { useEffect, useState } from "react"

const Employee = ({user,saveToken}) => {
    const [title,setTitle]=useState(null)
    const [name,setName]=useState(null)
    const [phone,setPhone]=useState(null)
    const [email,setEmail]=useState(null)
    const [address,setAddress]=useState(null)
    const [status,setStatus]=useState(null)
    const [vet_license,setVet_license]=useState(null)
    const [keyTitle,setKeyTitle]=useState(null)
    const [keys,setKeys]=useState(null)
    const [employeeID,setEmployeeID] = useState(null)

    const [alertData,setAlertData] = useState('')
    const [falseAlert,setFalseAlert] = useState(false)
    const [trueAlert,setTrueAlert] = useState(false)

    const {token} = useToken()

    useEffect (()=>{
        if(title=='admin'){
            setKeyTitle('AD')
        }else if(title=='cashier'){
            setKeyTitle('CA')   
        }else if(title=='veterinarian'){
            setKeyTitle('VET')
        }else if(title=='veterinary assistant'){
            setKeyTitle('VEA')
        }
        if(title){
            webUser.get(`/employee?employee_id=${keyTitle}`,{headers:{Authorization:`bearer ${token}`}})
            .then((response)=>{
                const number = response.data.length
                const paddedNumber = String(number+1).padStart(3, "0");
                setKeys(paddedNumber);
            })
            .catch((error)=>{
                console.log('Error fetching users:', error);
            })
        }
        setEmployeeID(`${keyTitle}-${keys}`)
    }) 

    const onAddEmployee = async (e,data) => {
        const response = await webUser.post("addEmployee", data,{
            headers:{
                Authorization:`bearer ${token}`
            }
        });
        if(response.data.success){
            saveToken(response.data._token)
            setAlertData("Add Data Success")
            setTrueAlert(true)
        }else{
            setAlertData(response.data.data)
            setFalseAlert(true)
        }
    }

    const onClearError = () => {
        setAlertData('')
        setFalseAlert(false)
        setTrueAlert(false)
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
            {trueAlert &&
            <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">Success !</span> {alertData}
            </div>
            </div>}
            <div className="flex bg-white/50">
                <div className="bg-[#0E7490]/40 w-[30%]">
                    <dl class="max-w-md text-gray-900 divide-y divide-gray-200 m-[20px]">
                        <div class="flex flex-col pb-3">
                            <dd class="text-lg font-semibold">Employee</dd>
                        </div>
                    </dl>
                </div>
                <div className="m-[20px] w-[70%] flex flex-wrap gap-[15px]">
                    <fieldset className="flex max-w-md flex-col gap-4" id="radio" onChange={(e)=>setTitle(e.target.value,onClearError())}>
                        <legend className="mb-4">
                            Choose Job title
                        </legend>
                        <div className="flex items-center gap-2">
                            <Radio
                            Checked
                            name="employee"
                            value="admin"
                            />
                            <Label >
                            Admin
                            </Label>
                        </div>   
                        <div className="flex items-center gap-2">
                            <Radio
                            name="employee"
                            value="cashier"
                            />
                            <Label >
                            Cashier
                            
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio
                            name="employee"
                            value="veterinarian"
                            />
                            <Label >
                            Veterinarian
                            </Label>
                        </div> 
                        <div className="flex items-center gap-2">
                            <Radio
                            name="employee"
                            value="veterinary assistant"
                            />
                            <Label >
                            Veterinary assistant
                            </Label>
                        </div>           
                    </fieldset>
                    { title =='veterinarian' &&
                    <div className="w-[69%] m-auto">
                        <div className="mb-2 block ">
                            <Label value="Veterinary license" />
                        </div>
                        <div className="flex items-center"><TextInput className="w-full" onChange={(e)=>{setVet_license(e.target.value),onClearError()}}/></div>
                    </div>}
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label value="Name" />
                        </div>
                        <TextInput onChange={(e)=>{setName(e.target.value),onClearError()}}/>
                    </div>        
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label value="Email" />
                        </div>
                        <TextInput onChange={(e)=>{setEmail(e.target.value),onClearError()}}/>
                    </div> 
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label value="Address" />
                        </div>
                        <TextInput onChange={(e)=>{setAddress(e.target.value),onClearError()}}/>
                    </div>  
                    <div className="w-[50%]">
                        <div className="mb-2 block">
                            <Label value="Phone" />
                        </div>
                        <TextInput onChange={(e)=>{setPhone(e.target.value),onClearError()}}/>
                    </div>   
                    <div className="w-[47%]">
                        <div className="mb-2 block">
                            <Label value="Status" />
                        </div>
                        <Select onChange={(e)=>{setStatus(e.target.value),onClearError()}} required>
                            <option value={''}>Select Employee Status</option>
                            <option value={'pass'}>Pass</option>
                            <option value={'probation'}>Probation</option>
                        </Select>
                    </div>    
                    

                    <Button className="m-auto w-full my-[20px]" color='success' onClick={(e)=>onAddEmployee(e,{employee_id:employeeID,jobtitle:title,e_name:name,e_email:email,e_address:address,e_phone:phone,status,license:vet_license})}>Add Data</Button>
                </div>
            </div>
        </div>
    )
}

export default Employee