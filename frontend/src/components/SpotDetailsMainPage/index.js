import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Route, useHistory } from 'react-router-dom'
import { getSpotThunk } from '../../store/currentSpot'
import SpotDetails from '../SpotDetails'
import EditSpotForm from '../EditSpotForm'

function SpotDetailsMainPage() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
            .catch((res) => history.push('/404'))
    }, [dispatch, history, spotId])

    const spot = useSelector(state => state.currentSpot)

    return(
        <>
            <Route exact path="/spots/:spotId">
                <SpotDetails />
            </Route>
            <Route exact path="/spots/:spotId/edit">
                <EditSpotForm spot={spot} />
            </Route>
        </>
    )
}

export default SpotDetailsMainPage
