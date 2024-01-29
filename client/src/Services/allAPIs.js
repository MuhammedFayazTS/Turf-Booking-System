const { BASE_URL } = require("./base_url");
const { commonAPI } = require("./commonApi");

const token = sessionStorage.getItem('token')
var headerConfig = {
    Authorization:`Bearer ${token}`
  }  


// register api call
export const registerAPI = async(userData)=>{
    return await commonAPI("post",`${BASE_URL}/api/user/register`,userData,"")
}
// login api call
export const loginAPI = async(userData)=>{
    return await commonAPI("post",`${BASE_URL}/api/user/login`,userData,"")
}

// ------------------------------ User -----------------------------
// -----------------------------------------------------------------

// get-userinfo-by token
export const getUserInfoByIdToken = async(data)=>{
    const {headers} = data
    return await commonAPI("post",`${BASE_URL}/api/user/get-user-info-by-token`,"",headers)
}
// get-userinfo-by id
export const getUserInfoById = async(id)=>{
    return await commonAPI("post",`${BASE_URL}/api/user/get-user-info-by-id`,{id:id},headerConfig)
}

// edit user info
export const editUserInfoAPI = async(reqBody)=>{
    return await commonAPI("put",`${BASE_URL}/api/user/edit`,reqBody,headerConfig)
}

// ------------------------------  venue ---------------------------
// -----------------------------------------------------------------

// venue register api call
export const venueRegisterAPI = async(data)=>{
    return await commonAPI("post",`${BASE_URL}/api/venue/register`,data,headerConfig)
}

// venue lsit api call
export const getAllVenuesAPI = async(data)=>{
    const {sort,search,sports,selectedAmenities,minPrice,maxPrice,location} = data
    return await commonAPI("get",`${BASE_URL}/api/venue?sort=${sort}&&search=${search}&&sports=${sports}&&amenities=${selectedAmenities}&&minPrice=${minPrice}&&maxPrice=${maxPrice}&&location=${location}`,
    "",headerConfig)
}

// featured venue lsit api call
export const getFeaturedVenuesAPI = async()=>{
    return await commonAPI("get",`${BASE_URL}/api/venue/featured-venues`,"","")
}

// venue info by id
export const getVenuDetailsAPI = async(id)=>{
    return await commonAPI("get",`${BASE_URL}/api/venue/${id}`,"",headerConfig)
}


// ------------------------------  Notifications ---------------------------
// -----------------------------------------------------------------

// mark all as read
export const markAllAsReadAPI = async(id)=>{
    return await commonAPI("put",`${BASE_URL}/api/user/mark-all-notifications-as-seen`,{userId:id},headerConfig)
}
// mark all as read
export const deleteAllNotificationsAPI = async(id)=>{
    return await commonAPI("put",`${BASE_URL}/api/user/delete-all-notifications-from-seen`,{userId:id},headerConfig)
}

// ------------------------------  admin ---------------------------
// -----------------------------------------------------------------

// updateReqStatusAPI by admin
export const updateReqStatusAPI = async(reqBody)=>{
    return await commonAPI("put",`${BASE_URL}/api/admin/update-request-status`,reqBody,headerConfig)
}

// get all booking details
export const fetchAllBookingsAPI = async()=>{
    return await commonAPI("get",`${BASE_URL}/api/admin/all-bookings`,"",headerConfig)
}

// get all users details
export const fetchAllUsersAPI = async()=>{
    return await commonAPI("get",`${BASE_URL}/api/admin/all-users`,"",headerConfig)
}

// remove user using id
export const removeUserAPI = async(id)=>{
    return await commonAPI("delete",`${BASE_URL}/api/admin/user/${id}`,"",headerConfig)
}

// remove venue using id
export const removeVenuerAPI = async(id)=>{
    return await commonAPI("delete",`${BASE_URL}/api/admin/venue/${id}`,"",headerConfig)
}

// remove Booking using id
export const removeBookingAPI = async(id)=>{
    return await commonAPI("delete",`${BASE_URL}/api/admin/booking/${id}`,"",headerConfig)
}

// edit user using id
export const editUserByAdminAPI = async(data)=>{
    const {id} = data
    return await commonAPI("put",`${BASE_URL}/api/admin/user/${id}`,data,headerConfig)
}

// edit venue using id
export const editVenueByAdminAPI = async(data)=>{
    const {id} = data
    return await commonAPI("put",`${BASE_URL}/api/admin/venue/${id}`,data,headerConfig)
}
// remove user using id
export const removeUserByAdminAPI = async(id)=>{
    return await commonAPI("delete",`${BASE_URL}/api/admin/user/${id}`,"",headerConfig)
}

// remove venue using id
export const removeVenueByAdminAPI = async(id)=>{
    return await commonAPI("delete",`${BASE_URL}/api/admin/venue/${id}`,"",headerConfig)
}

// remove venue using id
export const removeBookingByAdminAPI = async(id)=>{
    return await commonAPI("delete",`${BASE_URL}/api/admin/booking/${id}`,"",headerConfig)
}



 

// ------------------------------  booking ---------------------------
// -----------------------------------------------------------------

// Booking API for user
export const bookingAPI = async(reqBody)=>{
    return await commonAPI("put",`${BASE_URL}/api/user/book-appoiment`,reqBody,headerConfig)
}

// get all user Bookings
export const allUserBookingsAPI = async(status)=>{
    return commonAPI("post",`${BASE_URL}/api/user/get-all-bookings?status=${status}`,{userId:""},headerConfig)
}

// get all user Bookings
export const allVenueBookingsAPI = async()=>{
    return commonAPI("post",`${BASE_URL}/api/user/get-booking-summary`,{userId:""},headerConfig)
}



// ------------------------------  Rating ---------------------------
// --------------------------------------------------------------------

// add rating----------------------
export const addRatingAPI = async(reqBody)=>{
    return commonAPI("post",`${BASE_URL}/api/user/rating`,reqBody,headerConfig)
}
// view rating----------------------
export const viewRatingAPI = async(data)=>{
    const {venueId} = data
    return commonAPI("get",`${BASE_URL}/api/venue/rating/${venueId}`,"",headerConfig)
}


// ------------------------------  Payment ---------------------------
// --------------------------------------------------------------------
export const makePaymentAPI = async(body)=>{
    return commonAPI("post",`${BASE_URL}/api/user/checkout-session`,body,headerConfig)
}


// ------------------------------  Total count for public ---------------------------
// -----------------------------------------------------------------------------------
export const getTotalCountAPI = async()=>{
    return commonAPI("get",`${BASE_URL}/api/user/total-count`,headerConfig)
}
