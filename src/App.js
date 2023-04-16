import './App.css';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

function App() {
  const [show, setshow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState();
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setshow(!show);
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
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

    if (!email.endsWith('@keerthana.web')) {
      toast({
        title: 'Enter vaild keerthana Id',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    } else {
      const crd = btoa(email + '!' + password);
      setCredential(crd);
      console.log(crd, credential);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel color={'white'}>Email</FormLabel>
        <Input
          font={'bold, ittalic'}
          bg={'white'}
          color={'black'}
          type={'email'}
          value={email}
          placeholder="Enter your keerthana ID"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color={'white'}>Password</FormLabel>
        <InputGroup>
          <Input
            color={'black'}
            bg={'white'}
            type={show ? 'text' : 'password'}
            placeholder="Enter your keerthana password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="5m" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme={'blue'}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        LOGIN
      </Button>
    </VStack>
  );
}

export default App;
