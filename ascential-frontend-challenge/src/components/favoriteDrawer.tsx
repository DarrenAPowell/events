import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
  Button,
  Box
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';

interface Item {
  id: number;
  name: string;
  short_title?: string;
}

interface FavoriteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoriteDrawer: React.FC<FavoriteDrawerProps> = ({ isOpen, onClose }) => {
  const [favorites, setFavorites] = useState<Item[]>([]);

  useEffect(() => {
    if (isOpen) {
      const storedFavorites = localStorage.getItem('favorites');
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    }
  }, [isOpen]);

  const venues = favorites.filter(item => item.id < 487469);
  const events = favorites.filter(item => item.id >= 487469);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favorite Items</DrawerHeader>
        <DrawerBody>
          {favorites.length === 0 ? (
            <Text fontSize="lg" mb="2">
              No favorites!
            </Text>
          ) : (
            <>
              {venues.length > 0 && (
                <>
                  <DrawerHeader>Venues</DrawerHeader>
                  {venues.map((item) => (
                    <Link to={`/venues/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                      <Box _hover={{ textDecoration: 'underline' }}>
                        <Text fontSize="lg" mb="2">
                          <StarIcon mr="2" />
                          {item.short_title || item.name}
                        </Text>
                      </Box>
                    </Link>
                  ))}
                </>
              )}
              {events.length > 0 && (
                <>
                  <DrawerHeader>Events</DrawerHeader>
                  {events.map((item) => (
                    <Link to={`/events/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                      <Box _hover={{ textDecoration: 'underline' }}>
                        <Text fontSize="lg" mb="2">
                          <StarIcon mr="2" />
                          {item.short_title || item.name}
                        </Text>
                      </Box>
                    </Link>
                  ))}
                </>
              )}
            </>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FavoriteDrawer;
