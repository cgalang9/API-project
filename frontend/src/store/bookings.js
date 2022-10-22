import { csrfFetch } from "./csrf"

//Get all Bookings for a current user
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

//Get all Bookings for a booking based on the booking's id
const GET_ALL_BOOKINGS = 'bookings/GET_ALL_BOOKINGS'
export const getAllBookings = (bookings) => {
    return { type: GET_ALL_BOOKINGS, bookings }
}

export const getAllBookingsThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}/bookings`)

    if(response.ok) {
        const bookings = await response.json()
        dispatch(getAllBookings(bookings))
        return bookings
    }
}


//Create a Booking from a Spot based on the Spot's id
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
export const createBooking = (booking, bookingId) => {
    return { type: CREATE_BOOKING, booking, bookingId }
}

export const createBookingThunk = (newBooking, spotId) => async (dispatch) => {
    const { startDate, endDate } = newBooking
    console.log(newBooking)
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

//Edit a Booking
const EDIT_BOOKING = 'bookings/EDIT_BOOKING'
const editBooking = (booking) => {
    return { type: EDIT_BOOKING, booking }
}
export const editBookingThunk = (booking, bookingId) => async (dispatch) => {
    const { startDate, endDate } = booking
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        body: JSON.stringify({
            startDate,
            endDate
        }),
    })

    if(response.ok) {
        const booking = await response.json()
        dispatch(editBooking(booking))
        return booking
    }
}

//Delete Booking
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'
export const deleteBooking = (bookingId) => {
    return { type: DELETE_BOOKING, bookingId}
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(` /api/bookings/${bookingId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        dispatch(deleteBooking(bookingId))
    }
    const data = await response.json()
    return data
}



const initialState = {}

export const bookingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_BOOKINGS:
            const bookingsArr = action.bookings['Bookings']
            const bookingsObj = {}
            bookingsArr.forEach(booking => {
                bookingsObj[booking.id] = booking
            });
            const newStateGetAll = Object.assign({ ...state }, {...bookingsObj})
            return newStateGetAll
        case GET_ALL_BOOKINGS_CURRENT_USER:
            const bookingsArrCurrUser = action.bookings['Bookings']
            const bookingsObjCurrUser = {}
            bookingsArrCurrUser.forEach(booking => {
                bookingsObjCurrUser[booking.id] = booking
            });
            const newStateGetAllCurrUser = Object.assign({ ...state }, {...bookingsObjCurrUser})
            return newStateGetAllCurrUser
        case CREATE_BOOKING:
            const stateCreate = {...state}
            stateCreate[action.bookingId] = action.booking
            return stateCreate
        case EDIT_BOOKING:
            const stateEdit = {...state}
            stateEdit[action.booking.id] = action.booking
            return stateEdit
        case DELETE_BOOKING:
            const stateDelete = {...state}
            const id = action.bookingId
            delete stateDelete[id]
            return {...stateDelete}
        default:
            return state
    }

}
