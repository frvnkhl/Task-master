import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Select,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';


const ViewChange = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const handleChange = (event) => {
        props.changeView(event.target.value);
    }

    return(
        <div>
            <Button leftIcon={<ViewIcon />} ref={btnRef} className='my-3 mx-auto' colorScheme='teal'  onClick={onOpen}>
                Change view
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Change your tasks view</DrawerHeader>
                    <DrawerBody>
                        <Select variant='flushed' colorScheme='teal' placeholder='Select your desired view' onChange={handleChange}>
                            <option value='list'>List</option>
                            <option value='kanban'>Kanban</option>
                            <option value='calendar'>Calendar</option>
                        </Select>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='teal'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
        
    )
}

export default ViewChange;