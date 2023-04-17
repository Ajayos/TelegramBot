import './App.css';
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
  InputGroup,
  IconButton,
  InputLeftElement,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { FcManager, FcVoicePresentation } from 'react-icons/fc';
import { MdSend, MdLogin, MdLogout } from 'react-icons/md';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [bottocken, setBotTocken] = useState(
    '6270886295:AAGN7FXjDALw8NJtr1aatWPjuSSeEGFIFD4'
  );
  const [userid, setUserID] = useState('986226949');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendmessage, setSentMessage] = useState('');
  const [botname, setbotname] = useState('');
  const [rmessage, setrmessage] = useState(' ');
  useEffect(() => {
    const user = localStorage.getItem('Auth');
    let bot_request_url = 'https://api.telegram.org/bot' + user + '/getUpdates';

    fetch(bot_request_url)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok === true) {
          setIsAuth(true);
          setBotTocken(user);
          setbotname(user.split(':')[0]);
        } else if (
          data.ok == false &&
          data.error_code &&
          data.error_code === 401
        ) {
          localStorage.removeItem('Auth');
          setIsAuth(false);
        }
      });
  }, [isAuth]);

  const toast = useToast();
  const history = useHistory();
  function messagesRead() {
    let bot_request_url =
      'https://api.telegram.org/bot' + bottocken + '/getUpdates';

    fetch(bot_request_url)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok === true) {
          var len = data.result.length;
          var m = '';
          for (i = 0; i < len; i++) {
            var kl =
              ' Chat ID: ' +
              data.result[i].message.chat.id +
              ' Date: ' +
              new Date(data.result[i].message.date * 1000).toLocaleDateString(
                'it-IT'
              ) +
              ' Name: ' +
              data.result[i].message.chat.first_name +
              +' Message: ' +
              data.result[i].message.text;
            m += `<Text>` + kl + `</Text>`;
            console.log(kl);
          }
        } else if (data.ok === false) {
          var m = 'none';
        } else {
          var m = 'none';
        }
        setrmessage(m);
      });
  }
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
    let bot_request_url =
      'https://api.telegram.org/bot' + bottocken + '/getUpdates';

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
          localStorage.setItem('Auth', bottocken);
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
  const logouthand = async () => {
    localStorage.removeItem('Auth');
    setBotTocken('');
    setIsAuth(false);
  };
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
    setSentMessage(message.replace(' ', '+'));
    let bot_request_url =
      'https://api.telegram.org/bot' +
      bottocken +
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
          fontFamily="Times New Roman "
          color={'white'}
          align="center"
        >
          {'Telegram Bot Reply :)'}
        </Text>
        <Text
          fontSize="2xl"
          fontFamily="Open Sans, sans-serif, bold, Arvo "
          color={'green'}
          align="center"
        >
          {'Send messages via Telegram Bot'}
        </Text>
        <br />
        {isAuth ? (
          <center>
            <Button
              leftIcon={<MdLogout />}
              colorScheme={'blue'}
              onClick={logouthand}
              aria-label="Call Sage"
              fontSize="20px"
            >
              {'LOGOUT'}
            </Button>
            <br />
          </center>
        ) : (
          <></>
        )}
      </Box>
      {isAuth ? (
        <Box bg={'black'} w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>SEND</Tab>
              <Tab>MESSAGE</Tab>
              <Tab>HELP</Tab>
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
                    <Button
                      leftIcon={<MdSend />}
                      colorScheme={'blue'}
                      onClick={submitHandler}
                      aria-label="Call Sage"
                      fontSize="20px"
                    >
                      {'SEND'}
                    </Button>
                  </VStack>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      ) : (
        <Box bg={'black'} w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>LOGIN</Tab>
              <Tab>HOW TO</Tab>
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
                    <br />

                    <Button
                      leftIcon={<MdLogin />}
                      colorScheme={'blue'}
                      onClick={loginHandler}
                      aria-label="Call Sage"
                      fontSize="20px"
                    >
                      {'Login'}
                    </Button>
                  </VStack>
                </Box>
              </TabPanel>
              <TabPanel>
                <Text
                  fontSize="2xl"
                  fontFamily="Open Sans, sans-serif, bold, Arvo"
                  color={'white'}
                  align="center"
                >
                  {' '}
                  {'1. Open @BotFather in Telegram'}{' '}
                </Text>
                <Text
                  fontSize="2xl"
                  fontFamily="Open Sans, sans-serif, bold, Arvo"
                  color={'white'}
                  align="center"
                >
                  {' '}
                  {'2. Get your bot token'}{' '}
                </Text>
              </TabPanel>
              <TabPanel>
                {messagesRead()}
                <Text>{rmessage}</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Container>
  );
}

export default App;
