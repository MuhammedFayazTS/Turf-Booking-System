import React, { useState } from 'react'

function DisplayStarRating({ rating }) {
    // const [rating, setRating] = useState(null)
    const [ratingColor, setRatingColor] = useState(null)
    return (
        <>
            <span
                className="flex gap-1 text-amber-400"
                role="img"
                aria-label="Rating: 4 out of 5 stars"
            >
                {Array.from({ length: 5 }).map((star, index) => {
                    const currentRate = index + 1
                    return (
                        <label key={index}>
                            <input type="radio" name="rate"
                                className='hidden'
                                value={rating}
                            />
                            <span aria-hidden="true">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={currentRate <= (ratingColor || rating) ? "currentColor" : "none"}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                    />
                                </svg>
                            </span>
                        </label >
                    )
                })}
            </span>
        </>
    )
}

export default DisplayStarRating