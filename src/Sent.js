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
import { FcManager, FcVoicePresentation } from 'react-icons/fc';
import { MdSend } from 'react-icons/md';

function Send() {
    const [userid, setUserID] = useState('986226949');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sendmessage, setSentMessage] = useState('');
    const toast = useToast();

    const submitHandler = async () => {
        const user_ = localStorage.getItem('Tocken');
        setLoading(true);
        if (!userid || !message) {
          toast({
            title: 'Please Fill all the Feilds',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          });
          setLoading(false);
          return;
        }
        setLoading(false);
        setSentMessage(message.replace(' ', '+'));
        let bot_request_url =
          'https://api.telegram.org/bot' +
          user_ +
          '/sendMessage?chat_id=' +
          userid +
          '&text=' +
          sendmessage;
    
        fetch(bot_request_url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.ok === true) {
              let mk =
                'Successfully send message to ' +
                data.result.chat.first_name +
                ' ' +
                data.result.chat.last_name;
              toast({
                title: mk,
                description: data.result.chat.username,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
              });
              setLoading(false);
            } else if (data.ok === false) {
              if (data.error_code === 401) {
                toast({
                  title: 'Tocken Error',
                  status: 'warning',
                  description: data.description,
                  duration: 5000,
                  isClosable: true,
                  position: 'bottom',
                });
                setLoading(false);
              } else {
                toast({
                  title: 'error code ' + data.error_code,
                  status: 'warning',
                  description: data.description,
                  duration: 5000,
                  isClosable: true,
                  position: 'bottom',
                });
                setLoading(false);
              }
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
            <VStack
                spacing="5px"
            >
                <FormControl
                    id="chatid"
                    isRequired
                >
                    <FormLabel
                        color={'white'}
                    >
                        {'Chat ID'}
                    </FormLabel>
                    <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          FcVoicePresentation
                          children={<FcVoicePresentation color="gray.300" />}
                        />
                        <Input
                          color={'white'}
                          type="text"
                          placeholder="Chat ID"
                          value={userid}
                          onChange={(e) => setUserID(e.target.value)}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl
                    id="message"
                    isRequired
                >
                    <FormLabel
                        color={'white'}
                    >
                        {'Message'}
                    </FormLabel>
                    <Textarea
                        color={'white'}
                        type="text"
                        value={message}
                        placeholder={'message'}
                        onChange={(e) => setMessage(e.target.value)}
                        size="sm"
                        resize={'none'}
                    />
                </FormControl>
                <Button
                    leftIcon={<MdSend />}
                    colorScheme={'blue'}
                    onClick={submitHandler}
                    aria-label="Call Sage"
                    fontSize="20px"
                >
                    {'SEND '}
                </Button>
            </VStack>
        </Box>
    )
}
export default Send;