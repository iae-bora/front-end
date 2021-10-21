import { ReactNode } from 'react';
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button'

import '../styles/question.scss';


import { Rate } from './Rate'

type CardRouteProps = {
    name: string;
    address: string;
    image: string;
    rating: string;
    startHour: string;
    endHour: string;
    distanceFromOrigin: string;
    category: string;
    children?: ReactNode;
}

export function CardRoute(props: CardRouteProps) {
    return (
        <div>
            <Card style={{ width: "400px" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="400"
                        image={props.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.name}
                        </Typography>
                        <Typography variant="body2">
                            <b>Endereço:</b> {props.address}
                        </Typography>
                        <Typography variant="body2">
                            <b>Abertura:</b> {props.startHour}
                        </Typography>
                        <Typography variant="body2">
                            <b>Fechamento:</b> {props.endHour}
                        </Typography>
                        <Typography variant="body2">
                            <b>Distância:</b> {props.distanceFromOrigin}
                        </Typography>
                        <Typography variant="body2">
                            <b>Categoria:</b> {props.category}
                        </Typography>
                        <Typography variant="body2">
                            <Rate rating={props.rating}></Rate>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}