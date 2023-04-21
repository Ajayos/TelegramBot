import React, { useState, useEffect } from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
  Box,
  Container,
  Text,
  Textarea,
  InputLeftElement,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { FcManager, FcVoicePresentation } from 'react-icons/fc';
import { MdSend, MdLogin } from 'react-icons/md';

function Auth() {
    const [isAuth, setIsAuth] =  useState(false);
    const [bottocken, setBotTocken] = useState(
        '6270886295:AAGN7FXjDALw8NJtr1aatWPjuSSeEGFIFD4'
    );
    const toast = useToast();
    useEffect(() => {
        location.reload();
    }, [isAuth]);
    
    const loginHandler = async () => {
        if (!bottocken) {
            toast({
                title: 'Enter Tocken',
                status: 'warning',
                description: '',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
        setSentMessage(message.replace(' ', '+'));
        let bot_request_url = ''
          + 'https://api.telegram.org/bot'
          + bottocken
          + '/getUpdates';

        fetch(bot_request_url)
            .then((response) => response.json())
            .then((data) => {
                if (data.ok === true) {
                    toast({
                        title: 'Connected bot',
                        description: 'Logged in',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom',
                    });
                    setLoading(false);
                    localStorage.setItem('Tocken', bottocken);
                    setIsAuth(true);
                } else if (data.ok === false) {
                    toast({
                        title: 'Tocken Error',
                        status: 'warning',
                        description: 'Check your tocken enterd',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom',
                    });
                    setLoading(false);
                } else {
                    toast({
                        title: 'Check internet!',
                        status: 'warning',
                        description: 'Connection error',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom',
                    });
                    setLoading(false);
                }
            });
        return;
    }; 

    return (
        <Box
            bg={'black'}
            w="100%"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Tabs
                isFitted
                variant="soft-rounded"
            >
                <TabList
                    mb="1em"
                >
                    <Tab> {'LOGIN'} </Tab>
                    <Tab> {'HOW TO'} </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box
                            bg={'black'}
                            w="100%"
                            p={4}
                            borderRadius="lg"
                            borderWidth="1px"
                        >
                            <VStack
                                spacing="5px"
                            >
                                <FormControl
                                    id="Token"
                                    isRequired
                                >
                                    <FormLabel
                                        color={'white'}
                                    >
                                        {'Token'}
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            FcVoicePresentation
                                            children={<FcManager color="gray.300" />}
                                        />
                                        <Input
                                            color={'white'}
                                            type="text"
                                            value={bottocken}
                                            placeholder="Token"
                                            onChange={(e) => setBotTocken(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <br />
                                <Button
                                  leftIcon={<MdLogin />}
                                  colorScheme={'blue'}
                                  onClick={loginHandler}
                                  aria-label="Call Sage"
                                  fontSize="20px"
                                >
                                  {'Login '}
                                </Button>
                            </VStack>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        {'Open @BotFather in Telegram Get your bot token'}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Auth;