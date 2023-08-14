import { Button,Label,Select,TextInput,Textarea,Dropdown } from "flowbite-react"
import { useEffect } from "react"
import { useState } from "react"
import DropdownSelect from "react-select"

import { webUser,useToken } from "@/utils"

const Order = ({user,saveToken}) => {
    const [numMed,setNumMed]=useState(1)
    const [reqdate,setReqdate] = useState(null)
    const [description,setDescription] = useState([])
    const [expdate,setExpdate] = useState([])
    const [quantity ,setQuantity] = useState([])

    const [allMed,setAllMed] = useState([])

    const [selectMed, setSelectMed] = useState(Array(numMed).fill(null));

    let [orderMed,setOrderMed] = useState([])
    const {token} = useToken()

    const [alertData,setAlertData] = useState('')
    const [falseAlert,setFalseAlert] = useState(false)
    const [trueAlert,setTrueAlert] = useState(false)

    const onMedNum = (e)=> {
        setNumMed(e.target.value)
    }

    useEffect(()=>{
        webUser.get(`/medicine`)
        .then((response) => {
        setAllMed(response.data);
        })
        .catch((error) => {
            console.log('Error fetching medicine:', error);
        });
    },[])

    const OptionList = allMed.map((name) => ({
        label:name.medicine_name,
        value:{
            medicine_id:name.medicine_id,
            medicine_name:name.medicine_name,
            type:name.type,
            price:name.price
        }
    })) 

    const handleExpDateChange = (value, index) => {
        setExpdate(prevExpDates => {
            const updatedExpDates = [...prevExpDates];
            updatedExpDates[index] = value;
            return updatedExpDates;
        });
    };

    const handleDescriptionChange = (value, index) => {
        setDescription(prevDescriptions => {
            const updatedDescriptions = [...prevDescriptions];
            updatedDescriptions[index] = value;
            return updatedDescriptions;
        });
    };

    const handleQuantity = (value, index) => {
    const updatedQuantity = [...quantity];
    updatedQuantity[index] = value;
    setQuantity(updatedQuantity);
    };

    const handleSelectMed = (inputValue, index) => {
        const updatedSelectMed = [...selectMed];
        updatedSelectMed[index] = {
            ...inputValue,
            value: {
                ...inputValue.value,
                exp_date: expdate[index],
                description: description[index]
            }
        };
        setSelectMed(updatedSelectMed);
    };

    const filteredOptions = OptionList.filter((option) =>
    selectMed.label ? option.label.toLowerCase().includes(selectMed.label.toLowerCase()) : true
    );


     const onAddData = async (e,data) => {
        const newData = selectMed.map((item) => ({
            ...item,
            value: {
            ...item.value,
            exp_date: expdate[selectMed.indexOf(item)],
            description: description[selectMed.indexOf(item)]
        }
        }));

        const newMedOrders = newData.map((item) => item.value);
        
        setOrderMed((prevOrderMed) => [...(prevOrderMed || []), ...newData]);

        console.log(newMedOrders, quantity, reqdate );
        
        try {
            const response = await webUser.post('/addOrder', { med_order: newMedOrders, quantity, req_date: reqdate }, {
            headers: {
                Authorization: `bearer ${token}`
            }
            });
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
    };


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
                    <dd class="text-lg font-semibold">Order Medicine and Vaccine</dd>
                </div>
                </dl>
            </div>
            <div className="m-[20px] w-[70%] flex flex-wrap gap-[15px]">
                <div className="w-full flex">
                    <div className="w-[20%] mt-1">
                        <div>Medicine</div>
                        <select onChange={onMedNum}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                        </select>
                    </div>
                    <div className="w-[77%]">
                        <div className="mb-2 block">
                            <Label value="Req date" />
                        </div>
                        <TextInput onChange={(v)=>setReqdate(v.target.value)}/>
                    </div>
                </div>
                {Array.from({length:numMed},(_,index)=>(
                    <div key={index} className="w-full flex flex-col gap-[1em] border-b-[1px] border-[#6A9DD3]/50 pb-[0.5em]">
                        <div className="w-[76%]">
                            <div className="mb-2 block">
                                <Label value="Medicine Name" />
                            </div>
                            <DropdownSelect
                                options={OptionList}
                                isClearable
                                isSearchable
                                value={selectMed[index]}
                                onChange={(inputValue) => handleSelectMed(inputValue, index)}
                                placeholder={"Select Medicine"}
                            />
                        </div>
                        <div className="w-full flex gap-[1em]">
                            <div className="mb-2 block">
                                <Label value="Exp date" />
                                <TextInput onChange={(val) => handleExpDateChange(val.target.value, index)} />
                            </div>
                            
                            <div className="mb-2 block">
                                <Label value="Quantity" />
                                <TextInput onChange={(val) => handleQuantity(val.target.value, index)} />
                            </div>
                        </div>
                        <div className="w-[45%]">
                           
                        </div>
                        <div className="w-full">
                            <div>
                                <Label value="Description" />
                            </div>
                            <Textarea id="comment" onChange={(val) => handleDescriptionChange(val.target.value, index)} />
                        </div>
                    </div>
                ))}
                <Button onClick={onAddData} className="m-auto w-[30em] my-[20px]">Add data</Button>
            </div>
        </div>
        </div>
    )
}

export default Order