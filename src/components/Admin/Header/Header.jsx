import { Link } from "react-router-dom"
import logo from '@/assets/icon/veterinarian.png'
import { useState } from "react"
import { Button, Modal } from "flowbite-react"
import {RegisterAd} from "@components"

const Header = () => {

    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    return (
        <div className="sticky top-0 left-0 right-0 z-40">
            <div className=" px-[2em] items-center flex h-[60px] bg-[#0FACF1] justify-between  ">
                <Link to={'/'} className="text-xl text-white flex items-center">
                    <img src={logo} className="w-[2em] mr-[10px]" alt="" />
                    <div>Happy Pet</div>
                </Link>
                <div>[ Admin ]</div>
                <Button onClick={() => props.setOpenModal('form-elements')}>Register Admin</Button>
                <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                    <Modal.Header />
                    <RegisterAd />
                </Modal>
            </div>
        </div>
    )
}

export default Header