import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Venues from './components/Venues';
import Venue from './components/Venue';
import Events from './components/Events';
import Event from './components/Event';
import { Flex, Heading } from '@chakra-ui/react';
import {  Button} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import FavoriteDrawer from "./components/favoriteDrawer"

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Router>
      <Flex as="nav" bg="gray.700" color="white" padding="24px" alignItems="center" justifyContent="space-between" position="sticky" top="0" zIndex="1000">
        <Heading size="md">home</Heading>
        <Button onClick={toggleDrawer} leftIcon={<StarIcon color="yellow.400" />}>
           Favorites
        </Button>
      </Flex>

      <FavoriteDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/venues" Component={Venues} />
        <Route path="/venues/:venueId" Component={Venue} />
        <Route path="/events" Component={Events} />
        <Route path="/events/:eventId" Component={Event} />
      </Routes>
    </Router>
  );
};

export default App;
