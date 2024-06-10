import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Flex,
  Heading,
  Spinner,
  IconButton,
  Stack,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Button,
} from '@chakra-ui/react';
import { InfoIcon, StarIcon } from '@chakra-ui/icons';
import Breadcrumbs from './Breadcrumbs';
import Error from './Error';
import { useSeatGeek } from '../utils/useSeatGeek';
import { formatDateTime } from '../utils/formatDateTime';
import { type Venue } from './Events';
import useFavorites from '../utils/useFavorites';

interface EventInfoProps {
  event: {
    id: string;
    datetime_local: Date;
    short_title: string;
    datetime_utc: Date;
    venue: Venue;
    url: string;
  };
}

const Event: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { data: event, error } = useSeatGeek(`events/${eventId}`);

  if (error) return <Error />;

  if (!event) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Events', to: '/events' },
          { label: event.short_title },
        ]}
      />
      <Flex bgColor="gray.200" p={[4, 6]} alignItems="center" justifyContent="space-between">
        <Heading>{event.short_title}</Heading>
        <FavoriteButton event={event} />
      </Flex>
      <EventInfo event={event} />
    </>
  );
};

const FavoriteButton: React.FC<{ event: EventInfoProps['event'] }> = ({ event }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === event.id);

  return (
    <IconButton
      icon={<StarIcon />}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => toggleFavorite(event)}
      colorScheme={isFavorite ? 'yellow' : 'gray'}
    />
  );
};

const EventInfo: React.FC<EventInfoProps> = ({ event }) => (
  <Stack spacing="6" m="6">
    <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" borderRadius="md" p="4">
      <Stat>
        <StatLabel display="flex">
          <Box as="span">Venue</Box>
        </StatLabel>
        <StatNumber fontSize="xl">{event.venue.name_v2}</StatNumber>
        <StatHelpText>{event.venue.display_location}</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel display="flex">
          <Box as="span">Date</Box>
        </StatLabel>
        <Flex alignItems="center">
          <Tooltip placement="bottom" label={formatDateTime(event.datetime_utc)} aria-label="User timezone datetime">
            <Flex alignItems="center" cursor="pointer">
              <StatNumber fontSize="xl">{formatDateTime(event.datetime_local)}</StatNumber>
              <InfoIcon ml={2} />
            </Flex>
          </Tooltip>
        </Flex>
      </Stat>
    </SimpleGrid>
    <Flex>
      <Button as={'a'} href={event.url} minWidth="0">
        Buy Tickets
      </Button>
    </Flex>
  </Stack>
);

export default Event;
