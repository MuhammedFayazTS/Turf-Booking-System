import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useBreakpointValue,
  Checkbox,
  IconButton,
  ButtonGroup,
  Tooltip,
  Tfoot,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  EnvelopeOpenIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NotificationTable = ({ notifications, noNotificationsMessage, markAllAsRead, deleteAll, loading = false }) => {
  const showActions = useBreakpointValue({ base: false, md: true });
  const [selected, setSelected] = useState(new Set());

  if (loading) {
    return <p className="text-center text-gray-500">Loading notifications...</p>;
  }

  if (notifications?.length === 0) {
    return <p className="text-center text-gray-500">{noNotificationsMessage}</p>;
  }

  const renderTypes = (type) => {
    switch (type) {
      case 'info':
        return (
          <Tooltip label="Information message">
            <InformationCircleIcon className="w-6 h-6 text-blue-500" />
          </Tooltip>
        );
      case 'warning':
        return (
          <Tooltip label="Warning message">
            <ExclamationTriangleIcon className="w-6 h-6 text-amber-400" />
          </Tooltip>
        );
      case 'alert':
        return (
          <Tooltip label="Alert message">
            <ShieldExclamationIcon className="w-6 h-6 text-red-500" />
          </Tooltip>
        );
      case 'success':
        return (
          <Tooltip label="Success message">
            <CheckCircleIcon className="w-6 h-6 text-green-700" />
          </Tooltip>
        );
      default:
        return (
          <Tooltip label="Information message">
            <InformationCircleIcon className="w-6 h-6 text-blue-500" />
          </Tooltip>
        );
    }
  };

  const onSelect = (value) => {
    setSelected((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(value)) {
        newSelected.delete(value);
      } else {
        newSelected.add(value);
      }
      return newSelected;
    });
  };

  const onSelectAll = () => {
    setSelected((prev) => {
      if (prev.size === notifications?.length) {
        return new Set();
      } else {
        const newSelected = new Set(notifications.map((notification) => notification._id));
        return newSelected;
      }
    });
  };

  const handleRowClick = (e) => {
    console.log('Notification clicked');
  };

  return (
    <>
      {markAllAsRead && (
        <div className="flex justify-end mb-2 px-3">
          <Button variant="link" colorScheme="green" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
      )}
      {deleteAll && (
        <div className="flex justify-end mb-2 px-3">
          <Button variant="link" colorScheme="red" onClick={deleteAll}>
            Delete all
          </Button>
        </div>
      )}
      <Table variant="simple">
        <TableCaption>Notifications</TableCaption>
        <Thead>
          <Tr>
            <Th w="5%">
              <Checkbox onChange={onSelectAll} isChecked={selected.size === notifications?.length} />
            </Th>
            <Th w="5%">Type</Th>
            <Th>Title</Th>
            <Th>Message</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notifications?.map((notification, index) => (
            <motion.tr
              key={index}
              initial={{ background: 'rgba(255,255,255,0.1)' }}
              whileHover={{ background: '#E2E8F0' }}
              transition={{ duration: 0.2, type: 'tween' }}
              className="cursor-pointer"
              onClick={handleRowClick} // Handle row click
            >
              <Td onClick={(e) => e.stopPropagation()} fontWeight="semibold">
                <Checkbox
                  onChange={() => {
                    onSelect(notification?._id);
                  }}
                  isChecked={selected.has(notification?._id)}
                />
              </Td>
              <Td fontWeight="semibold">{renderTypes(notification?.type)}</Td>
              <Td className="max-w-[20ch] overflow-hidden text-nowrap text-ellipsis">{notification?.title}</Td>
              <Td className="max-w-[30ch] overflow-hidden text-nowrap text-ellipsis">{notification?.message}</Td>
              <Td>
                {showActions ? (
                  <ButtonGroup>
                    <IconButton
                      onClick={(e) => e.stopPropagation()} // Prevent row click
                      size="md"
                      isRound
                      variant="ghost"
                      colorScheme="blackAlpha"
                      isDisabled={selected.has(notification?._id)}
                    >
                      <Tooltip label="Mark as read">
                        <EnvelopeOpenIcon className="w-5 h-5" />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      onClick={(e) => e.stopPropagation()} // Prevent row click
                      size="md"
                      isRound
                      variant="ghost"
                      colorScheme="red"
                      isDisabled={selected.has(notification?._id)}
                    >
                      <Tooltip label="Delete">
                        <TrashIcon className="w-5 h-5" />
                      </Tooltip>
                    </IconButton>
                  </ButtonGroup>
                ) : (
                  <Link to={notification?.onClickPath} color="blue">
                    View
                  </Link>
                )}
              </Td>
            </motion.tr>
          ))}
        </Tbody>
        <Tfoot>
          <Button variant="link" colorScheme="red" onClick={deleteAll}>
            Delete all
          </Button>
        </Tfoot>
      </Table>
    </>
  );
};

export default NotificationTable;
