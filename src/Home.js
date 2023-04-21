import {
    Box,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels
} from '@chakra-ui/react';

import Send from './Send';
import Message from './Message';
import About from './About';
function Home() {

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
                    <Tab> {'SEND'} </Tab>
                    <Tab> {'MESSAGE'} </Tab>
                    <Tab> {'HELP'} </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Send />
                    </TabPanel>
                    <TabPanel>
                        <Message />
                    </TabPanel>
                    <TabPanel>
                        <About />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Home;