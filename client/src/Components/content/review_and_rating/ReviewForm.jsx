import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import StarRating from './StarRating';

const ReviewForm = ({ close, turfId }) => {
  const [reviewFormValue, setReviewFormValue] = useState({
    rating: 0,
    comment: '',
  });
  const dispatch = useDispatch();

  const addRating = async () => {
    const body = {
      turfId: turfId,
      rating: reviewFormValue.rating,
      comment: reviewFormValue.comment,
    };
    console.log('Value: ', body);
    close();
    // TODO: dispatch rating add action
    // Example: dispatch(addRatingAction(body));
  };

  return (
    <div className="flex flex-col space-y-3 p-3 rounded-md">
      <FormControl>
        <FormLabel color="gray.500">Rating:</FormLabel>
        <StarRating setReviewFormValue={setReviewFormValue} reviewFormValue={reviewFormValue} />
      </FormControl>
      <FormControl>
        <FormLabel color="gray.500">Review Message:</FormLabel>
        <Textarea
          value={reviewFormValue.comment}
          onChange={(e) => setReviewFormValue({ ...reviewFormValue, comment: e.target.value })}
          size="md"
        />
      </FormControl>
      <Button onClick={addRating} bgColor="orange" color="white" _hover={{ bgColor: 'orange' }}>
        Submit
      </Button>
    </div>
  );
};

export default ReviewForm;
