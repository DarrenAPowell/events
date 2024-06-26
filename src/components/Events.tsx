import React from 'react';
import {
  SimpleGrid,
  Flex,
  Spinner,
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  Stack,
  Image,
  LinkBox,
  LinkOverlay ,
  IconButton
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import Breadcrumbs from './Breadcrumbs';
import Error from './Error';
import { useSeatGeek } from '../utils/useSeatGeek';
import { formatDateTime } from '../utils/formatDateTime';
import useFavorites from '../utils/useFavorites';
import { Item } from '../utils/useFavorites';

export interface Performers {
  image: string;
}

export interface Venue {
  name_v2: string;
  display_location: string;
}

export interface EventProps {
  id: string;
  short_title: string;
  datetime_utc: Date;
  performers: Performers[];
  venue: Venue;
}

interface EventItemProps {
  event: EventProps;
}

const Events: React.FC = () => {
  const { data, error } = useSeatGeek('/events', { 
    type: 'concert',
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

  const events: EventProps[] = data.events.map((event: any) => ({
    id: event.id,
    short_title: event.short_title,
    datetime_utc: new Date(event.datetime_utc),
    performers: event.performers,
    venue: event.venue,
  }));

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Events' }]} />
      <SimpleGrid spacing="6" m="6" minChildWidth="350px">
      {events.map((event: EventProps) => (
          <EventItem key={event.id.toString()} event={event} favorites={favorites} toggleFavorite={toggleFavorite} />
        ))}
      </SimpleGrid>
    </>
  );
};

const EventItem: React.FC<EventItemProps & { favorites: Item[]|EventProps[]; toggleFavorite: (event: Item|EventProps) => void; }> = ({ event, favorites, toggleFavorite }) => (
  <LinkBox 
    as={Card} 
    variant="outline"
    overflow="hidden"
    bg="gray.50"
    borderColor="gray.200"
    _hover={{ bg: 'gray.100' }}
  >
    <Image src={event.performers[0].image} />
    <CardBody>
      <Stack spacing="2">
        <Heading size="md">
          <LinkOverlay as={Link} to={`/events/${event.id}`}>{event.short_title}</LinkOverlay>
        </Heading>
        <Box alignSelf="flex-start">
          <IconButton
            icon={<StarIcon />}
            aria-label="Add to favorites"
            onClick={() => toggleFavorite(event)}
            colorScheme={favorites.some((fav: { id: string; }) => fav.id === event.id) ? 'yellow' : 'gray'}
            size="sm"
            mt={2}
          />
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.600">
            {event.venue.name_v2}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {event.venue.display_location}
          </Text>
        </Box>
        <Text fontSize="sm" fontWeight="bold" color="gray.600" justifySelf={'end'}>
          {formatDateTime(event.datetime_utc)}
        </Text>
      </Stack>
    </CardBody>
  </LinkBox>
);

export default Events;