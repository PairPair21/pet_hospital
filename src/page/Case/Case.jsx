import { Menu, Footer } from "@/components"

import { webUser,useToken } from "@/utils"
import { useEffect,useState } from "react"
import { Label, Radio,Modal } from 'flowbite-react';

const Case = ({user,clearToken}) => {

    const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

    const[pet,setPet] = useState()
    const[selectedPet,setSelectedPet] = useState(null)
    const {token} = useToken()
    const [showcase,setShowCase] = useState()

    const handleRadioClick = (value) => {
        if (selectedPet === value) {
            setSelectedPet(null);
        } else {
            setSelectedPet(value);
        }
    };

    console.log(selectedPet);

    useEffect(()=>{
        webUser.get(`/pet?pet_owner=${user.id}`,{headers:{
                Authorization:`bearer ${token}`
            }})
        .then((response) => {
        setPet(response.data);
        })
        .catch((error) => {
            console.log('Error fetching medicine:', error);
        });
    },[])

   
        useEffect(()=>{
        webUser.get(`/case?pet_id=${selectedPet}`,{headers:{
                Authorization:`bearer ${token}`
            }})
        .then((response) => {
        setShowCase(response.data);
        })
        .catch((error) => {
            console.log('Error fetching medicine:', error);
        });
    },[selectedPet])

    console.log(showcase);
    

    return (
        <div>
            <Menu user={user} clearToken={clearToken} />
                <div className="font-bold text-2xl w-full px-[2em] flex items-center text-white h-[100px] bg-[#2D86FF]">
                    Case
                </div>
                <div className="w-[80%] m-auto my-[1em] rounded-2xl shadow-xl shadow-gray-400 drop-shadow-2xl">
                    <div className="flex flex-col min-h-[39vh]">
                    <fieldset className="w-[50%] mx-auto divide-y divide-gray-200 dark:divide-gray-700 m-[2em]">
                        <legend className="mb-4">Choose your pet</legend>
                    {pet ? (
                    pet.map((data) => (
                    <div key={data.pet_id} className="pb-3 sm:pb-4 capitalize rounded-2xl bg-[#21A0D7]/50 m-[1em]">
                        <div className="flex items-center space-x-4 px-[2em] pt-[1em]">
                            <Radio
                                id={data.pet_id}
                                name="selectedPet"
                                value={data.pet_id}
                                checked={selectedPet === data.pet_id}
                                onChange={() => handleRadioClick(data.pet_id)}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {data.pet_id}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {data.species} {data.gender}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {data.pet_name}
                            </div>
                        </div>
                    </div>
                    ))
                    ) : (
                    <div>Loading...</div>
                    )}
                    </fieldset>
                    {selectedPet &&
                    <div className="flex justify-center">
                        <div className="p-4 m-2 ">
                            <div className="capitalize items-start">Case</div>                    
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Case ID
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Veterinarian
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Findings
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Start Date
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Start End
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Follow
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                medicine
                                            </th>
                                        </tr>
                                    </thead>
                            {showcase ? (
                            showcase.map((data) => (
                                <tbody key={data.case_id} >
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
                                            {data.case_id}
                                        </th>
                                        <td class="px-6 py-4 capitalize text-center">
                                            {data.e_name}
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            {data.price}
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            {data.findings}
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            {data.date_start.split('T')[0]}
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            {data.date_end.split('T')[0]}
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            {data.follow}
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                        <div className="text-[#2D86FF] cursor-pointer" onClick={() => props.setOpenModal('default')}>Link</div>
                                            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                                                <Modal.Header>Medicine And Vaccine in This Case</Modal.Header>
                                                <Modal.Body>
                                                    {data.med_order.map((med)=>(<div className="space-y-6">
                                                        <p className="my-[1em]">
                                                            <div>Medicine Name: {med.medicine_name}</div>
                                                            <div>Type: {med.type}</div>
                                                            <div>Exp Date: {med.exp_date}</div>
                                                        </p>                                 
                                                    </div>))}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                </Modal.Footer>
                                            </Modal>
                                    </td>
                                </tr>
                            </tbody>
                                                     ))
                        ) : (
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Null
                                    </th>
                                    <td class="px-6 py-4">
                                        Null
                                    </td>
                                    <td class="px-6 py-4">
                                        Null
                                    </td>
                                    <td class="px-6 py-4">
                                        Null
                                    </td>
                                    <td class="px-6 py-4">
                                        Null
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        </table>
                        </div>
                    </div>
                    </div>}
                </div>
            </div>
        <Footer />
    </div>
    )
}

export default Case