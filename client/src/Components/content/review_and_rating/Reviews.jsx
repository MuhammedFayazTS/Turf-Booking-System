import React from 'react';
import { Avatar } from '@chakra-ui/react';
import { NoSymbolIcon } from '@heroicons/react/24/outline';
import DisplayStarRating from './DisplayStarRating';

const Reviews = ({ ratings }) => {
  return (
    <div className="flex w-full flex-col divide-y divide-slate-200 overflow-y-auto">
      {ratings?.length > 0 ? (
        ratings.map((ratings, index) => <ReviewItem key={index} ratings={ratings} />)
      ) : (
        <NoReviewsMessage />
      )}
    </div>
  );
};

const ReviewItem = ({ ratings }) => (
  <div className="flex items-start py-4">
    <Avatar src={ratings?.userInfo?.image} name={ratings?.userInfo?.username} />
    <div className="flex flex-col w-full gap-1 ml-4">
      <div className="flex justify-between items-center">
        <h4 className="text-base font-medium text-slate-700">{ratings?.userInfo?.username}</h4>
        <span>
          <DisplayStarRating rating={ratings?.rating} />
        </span>
      </div>
      <p className="text-sm leading-6 text-slate-500">{ratings?.comment}</p>
    </div>
  </div>
);

const NoReviewsMessage = () => (
  <div className="h-full px-10 py-16 flex flex-col items-center justify-center gap-1 pointer-events-none text-gray-300">
    <span className="text-lg font-semibold inline-flex items-center gap-x-1">
      <NoSymbolIcon className="h-4 w-4" />
      No Review available
    </span>
    <span className="text-2xl font-semibold">Be the first to write a rating.</span>
  </div>
);

export default Reviews;
