import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" className="w-4 h-4" />}>
      {items.map((item, index) => (
        <BreadcrumbItem key={index} isCurrentPage={item.isCurrentPage}>
          <BreadcrumbLink as={Link} to={item.to}>
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
