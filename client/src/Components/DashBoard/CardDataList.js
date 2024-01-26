import { BuildingStorefrontIcon, CurrencyRupeeIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";

export const datas = [
    {
        "title":"Booking",
        "Icon":<ShoppingCartIcon className='w-7 h-7 text-green-500' />,
        "count":'5,800',
        "button":'View Bookings',
        "to":"bookings"
    },
    {
        "title":"Revenue",
        "Icon":<CurrencyRupeeIcon className='w-7 h-7 text-green-500' />,
        "count":'5,800',
        "button":'View Earnings',
        "to":"revenue"
    },
    {
        "title":"Users",
        "Icon":<UserIcon className='w-7 h-7 text-green-500' />,
        "count":'5,800',
        "button":'All Users',
        "to":"user-management"
    },
    {
        "title":"Venues",
        "Icon":<BuildingStorefrontIcon className='w-7 h-7 text-green-500' />,
        "count":'5,800',
        "button":'All Venues',
        "to":"venue-management"
    },
]