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
    rating: number;
}

export function CardFeedBack(props: CardRouteProps) {
    return (
        <div>
            <Card style={{ width: "400px" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="400"
                        color='#EFF6F8'
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.name}
                        </Typography>
                        <Typography variant="body2">
                            <Rate rating={props.rating.toString()}></Rate>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}