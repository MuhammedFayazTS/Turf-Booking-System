import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Icon,
  Button,
  Divider,
  Flex,
  IconButton,
  Tooltip,
  ButtonGroup,
  Spinner,
  Center,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { getNotificationDetails } from '../../redux/slices/notification.slice';
import { useDispatch, useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/outline';

// Fake notification object
const fakeNotification = {
  type: 'success',
  title: 'Notification Title',
  message: 'This is a detailed message of the notification. It could be quite long, depending on the content.',
  date: '2024-08-09T14:32:00Z',
  onClickPath: '/details', // Hypothetical path for view details link
};

const NotificationView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, notificationDetails } = useSelector((state) => state.notification);

  const renderTypeIcon = (type) => {
    switch (type) {
      case 'info':
        return (
          <Tooltip label="Information message">
            <Icon as={InformationCircleIcon} boxSize={6} color="blue.500" />
          </Tooltip>
        );
      case 'warning':
        return (
          <Tooltip label="Warning message">
            <Icon as={ExclamationTriangleIcon} boxSize={6} color="orange.400" />
          </Tooltip>
        );
      case 'alert':
        return (
          <Tooltip label="Alert message">
            <Icon as={ShieldExclamationIcon} boxSize={6} color="red.500" />
          </Tooltip>
        );
      case 'success':
        return (
          <Tooltip label="Success message">
            <Icon as={CheckCircleIcon} boxSize={6} color="green.600" />
          </Tooltip>
        );
      default:
        return (
          <Tooltip label="Information message">
            <Icon as={InformationCircleIcon} boxSize={6} color="blue.500" />
          </Tooltip>
        );
    }
  };

  useEffect(() => {
    dispatch(getNotificationDetails(id));
  }, [dispatch, id]);

  return (
    <Box p={5} w="100%" h={'80vh'} mx="auto">
      {loading ? (
        <Stack h={'100%'} justifyContent={'center'} alignItems={'center'}>
          <Spinner />
        </Stack>
      ) : (
        <Stack borderWidth={1} borderRadius="lg" p={5} h={'100%'} bg="white">
          <Flex align="center" mb={4}>
            <IconButton variant={'ghost'} isRound onClick={() => navigate(-1)}>
              <ArrowLeftIcon className="w-5 h-5" />
            </IconButton>
            <Box ml={4}>
              <Heading size="md">
                {notificationDetails.title}
                &nbsp;{renderTypeIcon(notificationDetails.type)}
              </Heading>

              <Text color="gray.600">{new Date(notificationDetails.createdAt).toLocaleDateString()}</Text>
            </Box>
          </Flex>
          <Divider mb={4} />
          <Text flex={1} mb={4} overflowY={'auto'}>
            {notificationDetails.message}
          </Text>
          <Box>
            <Button
              leftIcon={<TrashIcon className="w-5 h-5" />}
              colorScheme="red"
              onClick={() => console.log('Delete api')}
            >
              Delete
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default NotificationView;
