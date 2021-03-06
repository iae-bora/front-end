import { useState, useEffect } from 'react';

import { useAuth } from '../hooks/userAuth'

import { SideBar } from '../components/SideBar'
import { RouteHistory } from '../components/RouteHistory'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CardFeedBack } from '../components/CardFeedBack'

import api from '../services/api';

interface Route {
    id: number;
    routeDate: string;
    touristPoints: Array<TouristPoint>;
    // routes: {id:number;};
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

export function Home() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, signInWithGoogle } = useAuth()
    const [routes, setRoutes] = useState<Array<Route>>();

    useEffect(() => {
        const handleRoutes = async () => {
            await api.get(`Routes/all/${user?.id}`)
                .then(response => {
                    const routesGet = response.data.filter((route : Route) => {
                        return route.touristPoints.length > 0
                    })
                    setRoutes(routesGet);
                }).catch(error => {
                    console.log(error);
                })
        }
        handleRoutes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="page-room">
            <SideBar></SideBar>
            <main>
                <form className='routes-list'>
                    {
                        routes &&
                        routes.map(route => {
                            return (
                                <RouteHistory
                                    key={route.id}
                                    id={route.id}
                                    routeDate={route.routeDate}
                                    touristPoints={route.touristPoints}
                                />
                            )
                        })
                    }
                    
                </form>
            </main>
        </div>

    )
}