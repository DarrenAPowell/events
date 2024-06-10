import React from 'react';
import { SimpleGrid, Flex, Spinner, Heading, Text, Box, Badge, LinkBox, LinkOverlay, IconButton } from '@chakra-ui/react';
import { Link as BrowserLink } from 'react-router-dom';
import { useSeatGeek } from '../utils/useSeatGeek';
import Error from './Error';
import Breadcrumbs from './Breadcrumbs';
import useFavorites from '../utils/useFavorites';
import { StarIcon } from '@chakra-ui/icons';

export interface VenueProps {
  id: number;
  has_upcoming_events: boolean;
  num_upcoming_events: number;
  name_v2: string;
  display_location: string;
}

interface VenueItemProps {
  venue: VenueProps;
}

const Venues: React.FC = () => {
  const { data, error } = useSeatGeek('/venues', { 
    sort: 'score.desc',
    per_page: '24',
  });
  const { favorites, toggleFavorite } = useFavorites();

  if (error) return <Error />;

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    )
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Venues' }]} />
      <SimpleGrid spacing="6" m="6" minChildWidth="350px">
        {data.venues?.map((venue: VenueProps) => (
          <VenueItem key={venue.id.toString()} venue={venue} favorites={favorites} toggleFavorite={toggleFavorite} />
        ))}
      </SimpleGrid>   
    </>
  );
};

const VenueItem: React.FC<VenueItemProps & { favorites: VenueProps[]; toggleFavorite: (venue: VenueProps) => void; }> = ({ venue, favorites, toggleFavorite }) => (
  <LinkBox>
    <Box        
      p={[4, 6]}
      bg="gray.50"
      borderColor="gray.200"
      borderWidth="1px"
      justifyContent="center" 
      alignContent="center"
      rounded="lg"
      _hover={{ bg: 'gray.100' }}
    >
      <Badge colorScheme={venue.has_upcoming_events ? 'green' : 'red'} mb="2">
        {`${venue.has_upcoming_events ? venue.num_upcoming_events : 'No'} Upcoming Events`}
      </Badge>
      <Heading size='sm' noOfLines={1}>
        <LinkOverlay as={BrowserLink} to={`/venues/${venue.id}`}>
          {venue.name_v2}
        </LinkOverlay>
      </Heading>
      <Text fontSize="sm" color="gray.500">{venue.display_location}</Text>
      <IconButton
        icon={<StarIcon />}
        aria-label="Add to favorites"
        onClick={() => toggleFavorite(venue)}
        colorScheme={favorites.some(fav => fav.id === venue.id) ? 'yellow' : 'gray'}
        size="sm"
        mt={2}
      />
    </Box>
  </LinkBox>
);

export default Venues;