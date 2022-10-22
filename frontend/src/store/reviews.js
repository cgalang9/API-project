import { csrfFetch } from "./csrf"


//Get all Reviews of the Current User
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS'
export const getAllReviews = (reviews) => {
    return { type: GET_ALL_REVIEWS, reviews }
}

export const getCurrUserReviewsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`)

    if(response.ok) {
        const reviews = await response.json()
        dispatch(getAllReviews(reviews))
        return reviews
    }
}

//Create a Review for a Spot based on the Spot's id
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
export const createReview = (review) => {
    return { type: CREATE_REVIEW, review }
}

export const createReviewThunk = (newReview, spotId) => async (dispatch) => {
    const { review, stars } = newReview
    const response = await csrfFetch(`/api/spots/${spotId}/reviews` , {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars
        })
    })

    if(response.ok) {
        const review = await response.json()
        dispatch(createReview(review))
        return review
    }
}

//edit review
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
export const editReview = (review) => {
    return { type: EDIT_REVIEW, review }
}

export const editReviewThunk = (currReview, reviewId) => async (dispatch) => {
    const { review, stars } = currReview
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({
            review,
            stars
        })
    })

    if(response.ok) {
        const review = await response.json()
        dispatch(editReview(review))
        return review
    }
}

//delete review
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
export const deleteReview = (reviewId) => {
    return { type: DELETE_REVIEW, reviewId }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        return dispatch(deleteReview(reviewId))
    }
}




const initialState = {}

export const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_REVIEWS:
            const reviewsArr = action.reviews['Reviews']
            const reviewsObj = {}
            reviewsArr.forEach(review => {
                reviewsObj[review.id] = review
            });
            const newStateGetAll = Object.assign({ ...state }, {...reviewsObj})
            return newStateGetAll
        case EDIT_REVIEW:
            const stateEditReview = {...state}
            stateEditReview[action.review.id] = action.review
            return stateEditReview
        case CREATE_REVIEW:
            const stateCreateReview = {...state}
            stateCreateReview[action.review.id] = action.review
            return stateCreateReview
        case DELETE_REVIEW:
            const stateDelete = {...state}
            const id = action.reviewId
            delete stateDelete[id]
            return {...stateDelete}
        default:
            return state
    }
}
