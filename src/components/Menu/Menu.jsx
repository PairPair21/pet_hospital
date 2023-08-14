import React,{ useState } from "react"

import {Dropdown} from "@components"
import { Link } from "react-router-dom"

import profile from '@/assets/icon/profile-user-svgrepo-com.png'
import logo from "@/assets/icon/veterinarian.png"
import {  Button, Checkbox, Label, Modal, TextInput  } from "flowbite-react"


const Menu = ({user ,clearToken,setToken,setUser,setRole,role}) => {

    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    
    const [menu,setMenu] = useState(false)
    const handleOnClick = () =>{
        if(menu == false){
            setMenu(true)
        }else{
            setMenu(false)
        }
    }

    return(
        <div className="sticky top-0 left-0 right-0 z-40">
            <div className=" px-[2em] items-center flex h-[60px] bg-[#0FACF1] justify-between  ">
                <Link to={'/'} className="text-xl text-white flex items-center">
                    <img src={logo} className="w-[2em] mr-[10px]" alt="" />
                    <div>Happy Pet</div>
                </Link>
                {!user &&
                <div className="flex gap-[1.5em]">
                    <Button className='w-[8em] bg-[#006FA2]' onClick={() => props.setOpenModal('form-elements')}>Login</Button>
                    <Link to={'/register'}>
                        <Button className='w-[8em] bg-white/50 text-black'>Register</Button>
                    </Link>
                </div>
                }
                {user  &&
                <div className="flex items-center gap-[1em]">
                    <div>
                        <div className="font-bold">Welcome </div>
                        <div className="capitalize ">{user.fullname}</div>
                    </div>
                    <Button><Link to={'/case'}>Your Pet</Link></Button>
                    <Link className="text-sm" to={'/'}  onClick={clearToken}>Logout</Link>
                </div>
                }
                {/* { user && user.role =="admin" &&
                <div className="flex items-center gap-[1em]">
                   
                    <Link className="text-sm" onClick={clearToken}>Logout</Link>
                </div>
                } */}
            </div>
            {!user &&
            <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <div>
                    <Modal.Header />
                    <Dropdown setToken={setToken} setUser={setUser} setRole={setRole} />
                </div>
            </Modal>}
        </div>
    )
}

export default Menu