import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';

import { useAuth } from '../hooks/userAuth'
import { NestedModal } from '../components/Modal'

import '../styles/question.scss'

// eslint-disable-next-line @typescript-eslint/no-unused-vars

import api from '../services/api';

type RouteHistoryProps = {
    id: number;
    routeDate: string;
    touristPoints: Array<TouristPoint>;
}

interface TouristPoint {
    distanceFromOrigin: number;
    startHour: string;
    endHour: string;
    index: number;
    id: number;
    openingHours: {
        place: {
            address: string;
            category: number;
            image: string | null;
            name: string;
            rating: string;
            resturantCategory: string | null;
        }
    }
}

interface FeedBack {
    id: number;
    text: string;
    rating: number;
}

export function RouteHistory(props: RouteHistoryProps) {
    const history = useHistory();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, signInWithGoogle } = useAuth()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [feedbacks, setFeedbacks] = useState<Array<FeedBack>>();

    useEffect(() => {
        const handleFeedBack = async () => {
            await api.get(`feedback/${user?.id}`)
                .then(response => {
                    setFeedbacks(response.data);
                    // console.log(response.data)
                }).catch(error => {
                    console.log(error);
                })
        }

        handleFeedBack()

        // console.log(feedbacks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <NestedModal key={props.id} history={history} id={props.id}>
            <div className="cardRouteHistory">
                <p style={{ fontWeight: 'bolder', fontSize: 20 }}>
                    Data: {moment.tz(props.routeDate, 'UTC').format('DD/MM/yyyy')}
                </p>
                {props.touristPoints.map(touristPoints => {
                    return (
                        <div key={touristPoints.id} onClick={() => { setOpen(true) }
                        }>{touristPoints.openingHours.place.name}</div>
                    )
                })}
            </div>

        </NestedModal>

    )
}