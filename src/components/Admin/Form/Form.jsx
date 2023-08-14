import { Header, Med,CaseAdmin,Pet,Employee,Order } from "@/components"
import { useState } from "react"

const Form = ({user,saveToken}) => {
    const [form, setForm] = useState('pet')

    const handleForm = (formType) => {
        setForm(formType)
    }
    return(
        <div className="bg-[#7DC5E5] h-[88vh]">
                <div className="px-[15%] bg-[#7DC5E5]">
                    <div className="flex gap-[15px] w-[30em] border-b-2 pb-[10px] justify-center m-auto mt-[50px] mb-[20px] text-lg">
                        <div onClick={()=>handleForm('pet')} className=" px-[7px] hover:text-[#2D86FF] cursor-pointer">Pet</div>
                        <div onClick={()=>handleForm('order')} className=" px-[7px] hover:text-[#2D86FF] cursor-pointer">Order</div>
                        <div onClick={()=>handleForm('case')} className="px-[7px] hover:text-[#2D86FF] cursor-pointer">Case</div>
                        <div onClick={()=>handleForm('employee')} className="px-[7px] hover:text-[#2D86FF] cursor-pointer">Employee</div>
                        <div onClick={()=>handleForm('med')} className="px-[7px] hover:text-[#2D86FF] cursor-pointer">Medicine Data</div>
                    </div>
                    {form=="pet" &&
                    <Pet user={user} saveToken={saveToken} />
                    }
                    {form=="case" &&
                    <CaseAdmin user={user} saveToken={saveToken} />
                    }
                    {form=="employee" &&
                    <Employee user={user} saveToken={saveToken} />
                    }
                    {form=="med" &&
                    <Med user={user} saveToken={saveToken} />
                    }
                    {form == "order" &&
                    <Order user={user} saveToken={saveToken} />
                    }
                </div>
            </div>
    )
}

export default Form