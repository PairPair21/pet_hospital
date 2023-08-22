import React, { useState, useEffect } from "react";
import { Label, Select, TextInput, Button } from "flowbite-react";
import { webUser,useToken } from "@/utils";
import SetSelect from "react-select";

const Pet = ({user,saveToken}) => {
  const [species, setSpecies] = useState('');
  const [petname, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [sterilization, setSterilization] = useState('yes');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(null);
  const [petID, setPetID] = useState('');
  const [key,setKey]=useState('')

  const [owner, setOwner] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  
  const [alertData,setAlertData] = useState('')
  const [falseAlert,setFalseAlert] = useState(false)
  const [trueAlert,setTrueAlert] = useState(false)
  const {token} = useToken();

  const handleSpecies = (e) => {
    setSpecies(e.target.value)
  }

  useEffect(()=>{
    webUser.get(`/user?fullname=${owner}`,{headers:{Authorization:`bearer ${token}`}})
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log('Error fetching users:', error);
      });
  },[owner])

  const optionsList = users.map((user) => ({
    value:user.fullname,
    label:user.fullname
  }))

  const handleSelectUser = (inputValue) => {
    setSelectedUser(inputValue);
  };

  const filteredOptions = optionsList.filter((option) =>
    selectedUser ? option.label.toLowerCase().includes(selectedUser?.label.toLowerCase()) : true
  );

  useEffect(()=>{
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const weightInGrams = parseInt(weight) * 100;

    if(species=='dog'){
      setKey('D001')
    }else if(species=='cat'){
      setKey('C002')
    }else if(species=='exotic'){
      setKey('E003')
    }else{
      setKey('')
    }

    setPetID(`${key}${weightInGrams}${day}${month}`)
  
  },[species, weight])
  

  const onAddPet = async (e, data) => {

    if(petname==''||species==''){
      setFalseAlert(true)
      setAlertData('Please Add Impotant Data')
    }
    
    const response = await webUser.post("/addPet", data,{
      headers:{
        Authorization:`bearer ${token}`
      }
    });
    if(response.data.success){
      setTrueAlert(true)
      setAlertData("Add Data Success")
      saveToken(response.data._token)
    }else{
      setFalseAlert(true)
      console.log(error);
      setAlertData(response.data.data)
    }
  };

  const onClearError = () => {
    setAlertData('')
    setFalseAlert(false)
    setTrueAlert(false)
  }

  return (
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
              <dd class="text-lg font-semibold">Pet</dd>
            </div>
          </dl>
        </div>
        <div className="m-[20px] w-[70%] flex flex-wrap gap-[15px]">
          <div className="w-[29%]">
            <div className="mb-2 block">
              <Label value="Select pet Species" />
            </div>
            <Select  required onChange={handleSpecies}>
              <option >select species</option>
              <option value={"dog"}>Dog</option>
              <option value={"cat"}>Cat</option>
              <option value={"exotic"}>Exotic</option>
            </Select>
          </div>
          <div className="w-[63%]">
            <div className="mb-2 block">
              <Label value="Name" />
            </div>
            <TextInput required onChange={(v) => { setPetName(v.target.value),onClearError() }} />
          </div>
          <div className="w-full flex">
            <div className="mb-2 block w-[50%]">
              <Label value="Search Owner Name" />
              <SetSelect options={filteredOptions} 
              isClearable
              isSearchable 
              value={selectedUser} 
              onChange={handleSelectUser} 
              placeholder={"Select Owner"} />
            </div>
          </div>       
          <div className="w-[49%]">
            <div className="mb-2 block">
              <Label value="Breed" />
            </div>
            <TextInput onChange={(v) => { setBreed(v.target.value),onClearError() }} />
          </div>
          <div className="w-[32%]">
            <div className="mb-2 block">
              <Label value="Sterilizition" />
            </div>
            <Select onChange={(v) => { setSterilization(v.target.value),onClearError()}}  required>
              <option value={'yes'}>Yes</option>
              <option value={'no'}>No</option>
            </Select>
          </div>
          <div className="w-[32%]">
            <div className="mb-2 block">
              <Label value="Gender" />
            </div>
            <Select onChange={(v) => { setGender(v.target.value),onClearError() }} required>
              <option>Male</option>
              <option>Female</option>
            </Select>
          </div>
          <div className="w-[32%]">
            <div className="mb-2 block">
              <Label value="Weight" />
            </div>
            <div className="flex items-center"><TextInput type="number" required onChange={(v) => { setWeight(v.target.value),onClearError() }} />&nbsp;&nbsp;kg</div>
          </div>
          <Button type="submit" className="m-auto w-[30em] my-[20px]" onClick={(e)=>{onAddPet(e,{pet_id:petID,pet_name:petname,species:species,breed:breed,weight:weight,sterilizition:sterilization,gender:gender,owner:selectedUser?.value})}}>Add Data</Button>
        </div>
      </div>
    </div>
  );
};

export default Pet;
