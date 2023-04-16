import './App.css';
import React, { useState } from 'react';
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
  IconButton,
  Textarea,
  InputGroup,
  IconButton,
  InputLeftElement,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { FcManager, FcVoicePresentation } from 'react-icons/fc';
import { IoSend } from 'react-icons/io';

function App() {
  const [bottocken, setBotTocken] = useState('');
  const [userid, setUserID] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendmessage, setSentMessage] = useState('')

  const toast = useToast();
  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!bottocken || !userid) {
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
    setSentMessage(message.replace(" ", "+"))
    let bot_request_url = 'https://api.telegram.org/bot' + bottocken  + '/sendMessage?chat_id=' + userid + '&text=' + sendmessage;

            //Send request
            fetch(bot_request_url)
                .then(response => response.json())
                .then(data => console.log(data));
    console.log('load');
    return;
  };
  return (
    <Container maxW="xl" centerContent>
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
          {' '}
          Telegram Bot Reply{' '}
        </Text>
        <Text
          fontSize="2xl"
          fontFamily="Open Sans, sans-serif, bold, Arvo "
          color={'green'}
          align="center"
        >
          {' '}
          Send messages via Telegram Bot{' '}
        </Text>
      </Box>
      <Box bg={'black'} w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>LOGIN</Tab>
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
                <VStack spacing="5px">
                  <FormControl id="Token" isRequired>
                    <FormLabel color={'white'}>Token</FormLabel>
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
                  <FormControl id="chatid" isRequired>
                    <FormLabel color={'white'}>Chat ID</FormLabel>
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
                  <FormControl id="message" isRequired>
                    <FormLabel color={'white'}>Message</FormLabel>
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
                  <IconButton
                    colorScheme={'blue'}
                    width="100%"
                    onClick={submitHandler}
                    variant="outline"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={<IoSend />}
                  />
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default App;
