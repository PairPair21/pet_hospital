import React from "react";
import { useRef } from "react";
import { useState } from "react"

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

const Add = () => {

    const [openModal, setOpenModal] = useState();
  const emailInputRef = useRef(null)
  const props = { openModal, setOpenModal, emailInputRef };

    return (
        <div>
            <div className="cursor-pointer" onClick={() => props.setOpenModal('initial-focus')}>+ Add</div>
            <Modal
                show={props.openModal === 'initial-focus'}
                size="md"
                popup
                onClose={() => props.setOpenModal(undefined)}
                initialFocus={props.emailInputRef}
            >
                <Modal.Header />
                <Modal.Body>
                <div className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add your Pet</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Add by ID" />
                        </div>
                        <TextInput placeholder="ID: D001-1212"  />
                    </div>
                    <Button>Add Your Pet</Button>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Add by Name" />
                        </div>
                        <TextInput placeholder="Name: Josh"  />
                    </div>
                     <div>
                        <TextInput placeholder="Keys: D001"  />
                    </div>
                    <div className="w-full">
                        <Button>Add Your Pet</Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
      </div>
  )
}

export default Add