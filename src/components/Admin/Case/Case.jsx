import React, { useEffect } from "react";
import { useState } from "react";
import { Button,Label,Select,TextInput,Textarea,Dropdown } from "flowbite-react"
import Datepicker from "tailwind-datepicker-react"
import { webUser,useToken } from "@/utils";

const CaseAdmin = ({user,saveToken}) => {
    const {token} = useToken()
    const [startCase,setStartCase] = useState(null)
    const [endCase,setEndCase] = useState(null)

    const [petId,setPetId] = useState(null)
    const [finding,setFinding] = useState(null) 
    const [complains,setComplains] = useState(null) 
    const [cashier,setCashier] = useState(null) 
    const [price,setPrice]= useState(null)
    const [vetName,setVetName] = useState(null)
    const [follow,setFollow] = useState(null) 
    const [weight,setWeight] = useState(null) 

    const [ordermed,setOrdermed]= useState()
    const [selectOrder,setSelectOrder] =useState()

    const [allVet,setAllVet] = useState()
    
    const [showStart, setShowStart] = useState (false)
    const handleChangeStart = (dateStart) => {
        setStartCase(dateStart)
    }
    const handleCloseStart = (state) => {
        setShowStart(state)
    }

    const [alertData,setAlertData] = useState('')
    const [trueAlert,setTrueAlert] = useState(false)
    const [falseAlert,setFalseAlert] = useState(false)

    
    const [petName,setPetName] = useState(null)
    const [owner,setOwner] = useState(null)
    useEffect(() => {
        webUser.get('order', { headers: { Authorization: `bearer ${token}` } })
        .then((response) => {
            setOrdermed(response.data); 
        })
        .catch((error) => {
            console.log('Error fetching order medicine:', error);
        });

        webUser.get('employee?jobtitle=veterinarian',{headers:{Authorization:`bearer ${token}`}})
        .then((response)=>{
            setAllVet(response.data)
        })
        .catch((error) => {
            console.log('Error fetching employee:', error);
        });
    },[]);

    useEffect(()=>{
        webUser.get(`/pet?pet_name=${petName}`, { headers: { Authorization: `bearer ${token}` } })
        .then((response) => {
            setOwner(response.data); 
        })
        .catch((error) => {
            console.log('Error fetching order medicine:', error);
        });
    },[petName])

    const startDate = {
        title: "Start Date",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-[#6CBEED]",
            todayBtn: "color-black bg-black text-black mx-[2px]",
            clearBtn: "",
            icons: "h-[2em] text-sm p-[7px] flex items-center mx-[1px]",
            text: "",
            disabledText: "bg-[#6A9DD3] m-[2px]",
            input: "",
            inputIcon: "",
            selected: "",
            title:"m-[0px]"
        },
        icons: {
            prev: () => <span>Previous</span>,
            next: () => <span>Next</span>,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        language: "en",
    }
 
    const [showEnd, setShowEnd] = useState (false)
    const handleChangeEnd = (dateEnd) => {
        setEndCase(dateEnd)
    }
    const handleCloseEnd = (stateEnd) => {
        setShowEnd(stateEnd)
    }
    const endDate = {
        title: "End Date",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-[#6CBEED]",
            todayBtn: "color-black bg-black text-black mx-[2px]",
            clearBtn: "",
            icons: "h-[2em] text-sm p-[7px] flex items-center mx-[1px]",
            text: "",
            disabledText: "bg-[#6A9DD3] m-[2px]",
            input: "",
            inputIcon: "",
            selected: "",
            title:"m-[0px]"
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => <span>Previous</span>,
            next: () => <span>Next</span>,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        language: "en",
    }

    const [allCashier,setAllCashier] = useState([])

    useEffect(()=>{
        fetchCashier()
    },[])

    const fetchCashier = async () => {
        try {
            const response = await webUser.get('/employee?jobtitle=cashier',{ headers:{Authorization:`bearer ${token}`} })
            const cashierData = response.data
            setAllCashier(cashierData)
        } catch (error) {
            console.log(error);
        }
    }

    const onAddData = async (e,data) => {
        try {
            const response = await webUser.post('/addCase',{
                date_start:startCase,
                date_end:endCase,
                findings:finding,
                complains,
                cashier,
                price,
                vet_id:vetName,
                pet_id:petId,
                follow,
                weight,
                order_med_id:selectOrder,},
                {headers:{Authorization:`bearer ${token}`}}
            )
            if (response.data.success) {
                setTrueAlert(true);
                setAlertData("Add Data Success");
                saveToken(response.data._token);
            } else {
                setFalseAlert(true);
                setAlertData(response.data.data);
            }

        } catch (error) {
            console.log(error); 
            setFalseAlert(true);
            setAlertData("An error occurred while processing the request.");
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
                            <dd class="text-lg font-semibold">Add-Case</dd>
                        </div>
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label value="Select Order Medicine Data" />
                            </div>
                            <Select onChange={(e)=>{setSelectOrder(e.target.value)}}>
                                <option value="">Select Order Medicine Data</option>
                                {ordermed?.map((data) => (
                                    <option key={data.order_id} value={data.order_id}>Data Create:{data.create_date.split('.')[0]} Order id:{data.order_id}</option>
                                ))}
                            </Select>
                        </div>     
                    </dl>
                </div>
                <div className="m-[20px] w-[70%] flex flex-wrap gap-[15px]">
                    <div className="w-[49%]">
                        <div>Start Case</div>
                        <Datepicker options={startDate} onChange={handleChangeStart} show={showStart} setShow={handleCloseStart} />
                    </div>
                    <div className="w-[49%]">
                        <div>End Case</div>
                        <Datepicker options={endDate} onChange={handleChangeEnd} show={showEnd} setShow={handleCloseEnd} />
                    </div>
                    <div className="w-[40%]">
                        <div className="mb-2 block">
                            <Label value="Name" />
                        </div>
                        <TextInput onChange={(e)=>{setPetName(e.target.value),onClearError()}}/>
                    </div>   
                    <div className="w-[35%] ">
                        <div className="mb-2 block">
                            <Label value="Select Owner Pet" />
                        </div>
                        <Select onChange={(e)=>{setPetId(e.target.value),onClearError()}}>
                            <option value="">Select Owner Pet</option>
                            {owner?.map((user) => (
                            <option key={user.user_id} value={user.pet_id}>{user.fullname}</option>
                            ))}
                        </Select>
                    </div>    
                    <div className="w-[20%]">
                        <div className="mb-2 block">
                            <Label value="Pet Weight" />
                        </div>
                        <TextInput onChange={(e)=>{setWeight(e.target.value),onClearError()}}/>
                    </div>  
                    <div  className="w-[60%] mt-[0.5em]">
                        <Label value="Select Veterinarian" />
                        <Select onChange={(e)=> {setVetName(e.target.value),onClearError()}}>
                            <option value="">Select Veterinarian</option>
                            {allVet?.map((data) => (
                            <option key={data.employee_id} value={data.employee_id}>{data.e_name}</option>
                            ))}
                        </Select>
                    </div>     
                    <div className="w-[30%]">
                        <div className="mb-2 block">
                            <Label value="Price" />
                        </div>
                        <TextInput type="number" onChange={(e)=>{setPrice(e.target.value),onClearError()}} />
                    </div> 
                    <div className="w-[60%]">
                        <div className="mb-2 block">
                            <Label value="Cashier Name" />
                        </div>
                        <Select onChange={(e)=>{setCashier(e.target.value),onClearError()}}>
                            <option value="">Select Cashier</option>
                            {allCashier.map((data) => (
                                <option key={data.e_name} value={data.employee_id}>{data.e_name}</option>
                            ))}
                        </Select>
                    </div>      
                    <div className="w-[29%]">
                        <div className="mb-2 block">
                            <Label value="Follow?" />
                        </div>
                        <Select onChange={(e)=>{setFollow(e.target.value),onClearError()}} required >
                            <option >Case have to following?</option>
                            <option value={"yes"}>Yes</option>
                            <option value={"no"}>No</option>
                        </Select>
                    </div>
                    <div className="w-[49%] ">
                        <div className="mb-2 block">
                            <Label value="finding" />
                        </div>
                        <Textarea id="comment" rows={4} onChange={(e) => {setFinding(e.target.value),onClearError()}}/>
                    </div>  
                    <div className="w-[49%]">
                        <div className="mb-2 block">
                            <Label value="complains" />
                        </div>
                        <Textarea id="comment" rows={4} onChange={(e) => {setComplains(e.target.value),onClearError()}}/>
                    </div>  
                    <Button onClick={onAddData} className="m-auto w-[30em] my-[20px]" color='success'>Add Data</Button>
                </div>
            </div>
        </div>
            
    )
}

export default CaseAdmin