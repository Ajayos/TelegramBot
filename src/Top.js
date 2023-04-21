import React, { useState, useEffect } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Box,
    Text,
    Button,
    ButtonGroup
  } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
function Top() {
    const [isAuth, setIsAuth] =  useState(false);
    const [Authid, setAuthid] = useState(' ');
    const { isOpen, onToggle, onClose } = useDisclosure();

    const submitHandler = () => {
        localStorage.removeItem("Tocken");
        location.reload();
    }
    useEffect(() => {
        const user = localStorage.getItem('Tocken');
        if (user) isAuth(true); 
    }, [isAuth]);
    if(isAuth){
        return (
            <Box
            d="flex"
            p={3}
            bg={'black'}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
            >
                <Text
                  fontSize="4xl"
                  fontFamily="Open Sans, sans-serif, bold, Arvo "
                  color={'white'}
                  align="center"
                >
                  {' Telegram Bot Reply '}
                </Text>
                <Text
                  fontSize="2xl"
                  fontFamily="Open Sans, sans-serif, bold, Arvo "
                  color={'green'}
                  align="center"
                >
                  {' Send messages via Telegram Bot '}
                </Text>
            </Box>
        )
    } else {
        return (
            <Box
            d="flex"
            p={3}
            bg={'black'}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
            >
                <Text
                  fontSize="4xl"
                  fontFamily="Open Sans, sans-serif, bold, Arvo "
                  color={'white'}
                  align="center"
                >
                  {' Telegram Bot Reply '}
                </Text>
                <Text
                  fontSize="2xl"
                  fontFamily="Open Sans, sans-serif, bold, Arvo "
                  color={'green'}
                  align="center"
                >
                  {' Send messages via Telegram Bot '}
                </Text>
                <Popover
                    returnFocusOnClose={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    placement='center'
                    closeOnBlur={false}
                >
                    <PopoverTrigger>
                        <Button
                            leftIcon={<MdLogout />}
                            colorScheme={'blue'}
                            aria-label="Call Sage"
                            fontSize="20px"
                            mr={5}
                            onClick={onToggle}
                        >
                            {'LOGOUT'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader
                            fontWeight='semibold'
                        >
                            {'Confirmation'}
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            {'Are you sure you want to Logout?'}
                        </PopoverBody>
                        <PopoverFooter
                            display='flex'
                            justifyContent='flex-end'
                        >
                            <ButtonGroup
                                size='sm'
                            >
                                <Button
                                    variant='outline'
                                    onClick={onClose}
                                >
                                    {'NO'}
                                </Button>
                                <Button
                                    colorScheme='red'
                                    onClick={submitHandler}
                                >
                                    {'YES'}
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Box>
        )
    }
}

export default Top;