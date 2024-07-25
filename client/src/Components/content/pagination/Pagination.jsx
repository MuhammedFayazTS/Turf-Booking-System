import React from 'react';
import { Box, Button, ButtonGroup, Center, Stack, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({ currentPage, onPageChange, totalPages, showLastPage = false }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const firstPage = currentPage > 2 ? currentPage - 1 : 1;

    // Render previous button if not on first page
    if (currentPage > 1) {
      pageButtons.push(
        <Button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          leftIcon={<ChevronLeftIcon />}
          variant="outline"
          colorScheme="gray"
        >
          Previous
        </Button>
      );
    }

    // Render page buttons
    for (let page = firstPage; page <= Math.min(totalPages, firstPage + 2); page++) {
      pageButtons.push(
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          variant={currentPage === page ? 'solid' : 'outline'}
          colorScheme={currentPage === page ? 'green' : 'gray'}
          transition={'ease'}
          transitionDuration={0.3}
        >
          {page}
        </Button>
      );
    }

    // Optionally render last page button
    if (showLastPage && totalPages > 3 && totalPages > firstPage + 2) {
      pageButtons.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          variant={currentPage === totalPages ? 'solid' : 'outline'}
          colorScheme={currentPage === totalPages ? 'green' : 'gray'}
          transition={'ease'}
          transitionDuration={0.3}
        >
          {totalPages}
        </Button>
      );
    }

    // Render next button if not on last page
    if (!isLastPage) {
      pageButtons.push(
        <Button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          rightIcon={<ChevronRightIcon />}
          variant="outline"
          colorScheme="gray"
        >
          Next
        </Button>
      );
    }

    return pageButtons;
  };

  if (totalPages > 1) {
    return (
      <Center mt={6}>
        <Stack alignItems="center">
          <ButtonGroup isAttached variant="outline" spacing={0}>
            {renderPageButtons()}
          </ButtonGroup>
          <Box>
            <Text fontSize="sm">
              Page {currentPage} of {totalPages}
            </Text>
          </Box>
        </Stack>
      </Center>
    );
  }
};

export default Pagination;
