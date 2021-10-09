
// import { DateTimePicker } from "@material-ui/pickers";
import { useHistory } from 'react-router-dom';

//SCSS
import '../styles/question.scss';

import api from '../services/api';

type TouristPoint = {
    touristPoints: Array<any>
}

export function UserRoutes() {
    // const [places, setPlaces] = useState('');
    // const [date, setDate] = useState<Date | null>(new Date());
    // const { user, signInWithGoogle } = useAuth()
    const history = useHistory();
    console.log(history.location)

    const touristPoints = history.location.state as Array<TouristPoint>

    const categories =  [
        "Parque",
        "Museu",
        "Cinema",
        "Shopping",
        "Bar",
        "Show",
        "Biblioteca",
        "Estádio",
        "Jogos",
        "Teatro"
    ]

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <h2>Rotas Criadas</h2>
                </div>
            </header>

            <main>
                <form>
                    {touristPoints[0].touristPoints.map(route =>{
                        return(
                            <div className="question">
                                <h1>{route.openingHours.place.name}</h1>
                                <h3>{route.openingHours.place.address}</h3>
                                <img alt={route.openingHours.place.name} src={route.openingHours.place.image}/>
                                <h3>{route.openingHours.place.rating}</h3>
                                <h3>{route.startHour} - {route.endHour}</h3>
                                <h3>{route.distanceFromOrigin}</h3>
                                <h3>{categories[route.openingHours.place.category -1]}</h3>
                            </div>
                        );
                    })}
                </form>
            </main>
        </div>
    )
}
