import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import ReviewForm from './ReviewForm';
import DisplayStarRating from './DisplayStarRating';
import { useParams } from 'react-router-dom';

const RatingWrapper = ({ rating }) => {
  const [showRatingForm, setShowRatingForm] = useState(false);

  const handleShowRatingForm = () => setShowRatingForm(true);
  const handleHideRatingForm = () => setShowRatingForm(false);

  const { id } = useParams();

  // Function to calculate the percentage of star ratings
  const percentageOfStars = (total, starCount) => (total > 0 ? (starCount / total) * 100 : 0);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <TitleSection />
      <RatingSection rating={rating} percentageOfStars={percentageOfStars} />
      <ReviewSection
        showRatingForm={showRatingForm}
        handleShowRatingForm={handleShowRatingForm}
        handleHideRatingForm={handleHideRatingForm}
        turfId={id}
      />
    </div>
  );
};

const TitleSection = () => <h4 className="font-bold text-slate-700">Customer reviews</h4>;

const RatingSection = ({ rating, percentageOfStars }) => {
  // Calculate the counts of each star rating?
  const starCounts = {
    5: rating?.ratings.filter((r) => r.rating === 5).length || 0,
    4: rating?.ratings.filter((r) => r.rating === 4).length || 0,
    3: rating?.ratings.filter((r) => r.rating === 3).length || 0,
    2: rating?.ratings.filter((r) => r.rating === 2).length || 0,
    1: rating?.ratings.filter((r) => r.rating === 1).length || 0,
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <DisplayStarRating size="lg" rating={rating?.average || 0} />
        <span>{rating?.average || 0.0} out of 5</span>
      </div>
      <span className="text-xs text-slate-400">Based on {rating?.count || 0} user ratings</span>
      <div className="flex w-full flex-col gap-4 pt-6">
        {[5, 4, 3, 2, 1].map((star) => (
          <StarRatingBar
            key={star}
            starCount={star}
            percentage={percentageOfStars(rating?.count, starCounts[star])}
            count={starCounts[star]}
          />
        ))}
      </div>
    </div>
  );
};

const StarRatingBar = ({ starCount, percentage, count }) => (
  <div className="flex items-center gap-2 w-full">
    <label
      id={`star-${starCount}-label`}
      htmlFor={`star-${starCount}`}
      className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
    >
      {starCount} star
    </label>
    <progress
      aria-labelledby={`star-${starCount}-label`}
      id={`star-${starCount}`}
      max="100"
      value={percentage}
      className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
    >
      {percentage}%
    </progress>
    <span className="w-9 text-xs font-bold text-slate-700">{count}</span>
  </div>
);

const ReviewSection = ({ showRatingForm, handleShowRatingForm, handleHideRatingForm, turfId }) => (
  <div className="mt-5 flex flex-col space-y-2 w-full">
    <h4 className="font-semibold text-slate-700 text-md">Share your thoughts</h4>
    <span className="text-sm">If you've used this product, share your thoughts with other customers</span>
    {showRatingForm ? (
      <ReviewForm close={handleHideRatingForm} turfId={turfId} />
    ) : (
      <Button onClick={handleShowRatingForm} size="sm" variant="outline" colorScheme="blackAlpha">
        Write a review
      </Button>
    )}
  </div>
);

export default RatingWrapper;
