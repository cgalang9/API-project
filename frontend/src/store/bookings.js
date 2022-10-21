import { csrfFetch } from "./csrf"

//Get all Bookings for a Spot based on the Spot's id
const GET_ALL_BOOKINGS_CURRENT_USER = 'bookings/GET_ALL_BOOKINGS_CURRENT_USER'
export const getAllBookingsCurrUser = (bookings) => {
    return { type: GET_ALL_BOOKINGS_CURRENT_USER, bookings }
}

export const getAllBookingsCurrUserThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`)

    if(response.ok) {
        const bookings = await response.json()
        dispatch(getAllBookingsCurrUser(bookings))
        return bookings
    }
}

//Get all Bookings for a Spot based on the Spot's id
const GET_ALL_BOOKINGS = 'bookings/GET_ALL_BOOKINGS'
export const getAllBookings = (bookings) => {
    return { type: GET_ALL_BOOKINGS, bookings }
}

export const getAllBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if(response.ok) {
        const bookings = await response.json()
        dispatch(getAllBookings(bookings))
        return bookings
    }
}


//Create a Booking from a Spot based on the Spot's id
const CREATE_BOOKING = 'booking/CREATE_BOOKING'
export const createBooking = (booking, spotId) => {
    return { type: CREATE_BOOKING, booking, spotId }
}

export const createBookingThunk = (newBooking, spotId) => async (dispatch) => {
    const { startDate, endDate } = newBooking
    const response = await csrfFetch(`/api/spots/${spotId}/bookings` , {
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate
        })
    })

    if(response.ok) {
        const booking = await response.json()
        dispatch(createBooking(booking))
        return booking
    }
}



const initialState = {}

export const bookingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_BOOKINGS:
            const stateGetAllBookings = { ...action.bookings }
            return stateGetAllBookings
        case GET_ALL_BOOKINGS_CURRENT_USER:
            const stateCurrUserBookings = { ...action.bookings }
            return stateCurrUserBookings
        case CREATE_BOOKING:
            const stateCreate = {...state}
            stateCreate[action.spotId] = action.booking
            return stateCreate
        default:
            return state
    }

}
