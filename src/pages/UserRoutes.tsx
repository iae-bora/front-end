
// import { DateTimePicker } from "@material-ui/pickers";
import { useHistory } from 'react-router-dom';

import { CardRoute } from '../components/CardRoute'

import { SideBar } from '../components/SideBar'

//SCSS
import '../styles/question.scss';

type TouristPoint = {
    touristPoints: Array<any>
}

export function UserRoutes() {
    const history = useHistory();

    const touristPoints = history.location.state as Array<TouristPoint>

    const categories = [
        "Parque",
        "Museu",
        "Cinema",
        "Shopping",
        "Bar",
        "Restaurante",
        "Show",
        "Biblioteca",
        "Estádio",
        "Jogos",
        "Teatro"
    ]

    return (
        <div id="page-room">
            <SideBar></SideBar>
            <main>
                <form>
                    {
                        touristPoints[0].touristPoints.map(route => {
                            return (
                                <div className="cardRoute">
                                    <CardRoute
                                        name={route.openingHours.place.name}
                                        address={route.openingHours.place.address}
                                        image={route.openingHours.place.image}
                                        rating={route.openingHours.place.rating}
                                        startHour={route.startHour}
                                        endHour={route.endHour}
                                        distanceFromOrigin={route.distanceFromOrigin}
                                        category={categories[route.openingHours.place.category - 1]}
                                    >
                                    </CardRoute>
                                </div>
                            );
                        })}
                </form>
            </main>
        </div>
    )
}
