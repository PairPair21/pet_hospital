import { webUser,useToken } from "@/utils"
import { Radio,Label,TextInput,Button } from "flowbite-react"
import { useEffect, useState } from "react"

const Med = ({user,saveToken}) => {

    const[type,setType]=useState(null)
    const[name,setName]=useState(null)
    const[manufacturer,setManufacturer]= useState(null)
    const[price,setPrice] = useState(0)
    const[volumn,setVolumn]= useState(null)

    const [alertData,setAlertData] = useState('')
    const [falseAlert,setFalseAlert] = useState(true)
    const [trueAlert,setTrueAlert] = useState(false)

    const {token} = useToken()


    const onClearError = () => {
        setAlertData('')
        setFalseAlert(true)
        setTrueAlert(false)
    }

    const onAddData = async (e,data) => {
        const response = await webUser.post("addMed", {medicine_name:name,manufacturer,price,type,volumn},{
            headers:{
                Authorization:`bearer ${token}`
            }
        });
        if(response.data.success){
            console.log(response.data);
            setTrueAlert(true)
            setAlertData("Add Data Success")
            saveToken(response.data._token)
            
        }else{
            setFalseAlert(false)
            setAlertData(response.data.data)
            console.log(response);
        }
    }

    return (
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
                            <dd class="text-lg font-semibold">Medicine and Vaccine Data</dd>
                        </div>
                    </dl>
                </div>
                <div className="m-[20px] w-[70%] flex flex-wrap gap-[15px]">
                    <div>
                        <fieldset className="flex max-w-md flex-col gap-4" id="radio" onChange={(e)=>{setType(e.target.value),onClearError()}}>
                            <legend className="mb-4">
                                Select Data Type
                            </legend>
                            <div className="flex items-center gap-2">
                                <Radio
                                Checked
                                name="type"
                                value="medicine"
                                />
                                <Label >
                                Medicine
                                </Label>
                            </div>   
                            <div className="flex items-center gap-2">
                                <Radio
                                name="type"
                                value="vaccine"
                                />
                                <Label >
                                Vaccine
                                </Label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label value="Name" />
                        </div>
                        <TextInput onChange={(e)=>{setName(e.target.value),onClearError()}} />
                    </div>        
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label value="Manufacturer" />
                        </div>
                        <TextInput onChange={(e)=>{setManufacturer(e.target.value),onClearError()}} />
                    </div> 
                    <div className="w-[48%]">
                        <div className="mb-2 block">
                            <Label value="Price" />
                        </div>
                        <TextInput onChange={(e)=>{setPrice(e.target.value),onClearError()}} />
                    </div> 
                    <div className="w-[48%]">
                        <div className="mb-2 block">
                            <Label value="Volumn" />
                        </div>
                        <TextInput onChange={(e)=>{setVolumn(e.target.value),onClearError()}} />
                    </div> 
                    <Button className="m-auto w-full my-[20px]" color='success' onClick={onAddData}>Add Data</Button>
                </div>
            </div>
        </div>
    )
}

export default Med