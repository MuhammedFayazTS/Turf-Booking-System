import { Button, FormControl, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import StarRating from './StarRating'
import { addRatingAPI } from '../../Services/allAPIs'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addRefresh } from '../../redux/alertSlice'

function ReviewForm({close}) {
    const [reviewFormValue,setReviewFormValue] = useState({
        rate: 0,
        message:''
    })
    const { id } = useParams()
    const dispatch = useDispatch()

    const addRating = async()=>{
        const body ={
            venueId: id,
            rate:reviewFormValue.rate,
            message:reviewFormValue.message
        }
        try {
            const response = await addRatingAPI(body)
            if(response.data.success) {
                toast.success(response.data.message)
                dispatch(addRefresh())
            }else{
                toast.error(response.data.message)
            }
            close()
        } catch (error) {
            close()
            toast.error("Error in adding rating")
            console.log(error)
        }
    }
    return (
        <>
            <div className='flex flex-col space-y-3 p-3 rounded-md'>
                {/* <Input placeholder='medium size' size='md' /> */}
                <FormControl>
                    <FormLabel color={'gray.500'}>Rating :</FormLabel>
                    <StarRating setReviewFormValue={setReviewFormValue} reviewFormValue={reviewFormValue} />
                </FormControl>
                <FormControl>
                    <FormLabel color={'gray.500'}>Review Message :</FormLabel>
                    <Textarea   
                    value={reviewFormValue.message}
                    onChange={(e)=>setReviewFormValue({...reviewFormValue,'message':e.target.value})}
                    size='md' />
                </FormControl>
                <Button onClick={addRating} bgColor={'orange'} color={'white'} _hover={{bgColor:'orange'}}>Submit</Button>
            </div>
        </>
    )
}

export default ReviewForm