import { FormEvent, useState, useEffect } from 'react';

import { useAuth } from '../hooks/userAuth'
import { useHistory } from 'react-router-dom';

import { SideBar } from '../components/SideBar'
import { Button } from '../components/Button';

import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

import api from '../services/api';

//SCSS
import '../styles/question.scss';

interface FeedBack {
    id: number;
    route: {id:number;};
    text: string;
    rating: number;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export function FeedBack() {


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, signInWithGoogle } = useAuth()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [text, setText] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rating, setRating] = useState<number | null>(0);

    const [feedbacks, setFeedbacks] = useState<Array<FeedBack>>();

    useEffect(() => {

        const handleFeedBack = async () => {
            await api.get(`feedback/${user?.id}`)
                .then(response => {
                    const feedbackGet = response.data.filter((feedback: FeedBack) =>{
                        return feedback.route.id === location.state.id
                    });
                    setFeedbacks(feedbackGet)
                    console.log(feedbackGet)
                }).catch(error => {
                    console.log(error);
                })
        }

        handleFeedBack()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const history = useHistory();

    const location = history.location as any

    const handleFeedBack = async (event: FormEvent) => {
        event.preventDefault();

        var json = {
            "text": text,
            "rating": rating,
            "userRouteId": location.state.id
        }

        console.log(json)

        await api.post(`feedback`, JSON.stringify(json))
            .then(response => {
                alert('FeedBack Salvo com sucesso')
                history.push('/Home')
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div id="page-room">
            <SideBar></SideBar>
            <main>
                <form>

                    <div className="question">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            multiline
                            maxRows={4}
                            label="FeedBack"
                            fullWidth
                            onChange={event => { setText(event.target.value); console.log(`Text: ${event.target.value}`) }}
                        />
                    </div>

                    <div className="question">
                        Deixe sua avaliação
                        <br />
                        <br />
                        <Rating
                            precision={0.5}
                            value={rating}
                            size="medium"
                            onChange={(event, newValue) => setRating(newValue)}
                        />
                    </div>

                    <div className="form-footer">
                        <Button
                            type="submit"
                            onClick={handleFeedBack}
                        >
                            Enviar FeedBack
                        </Button>
                    </div>
                    <br />
                    <div className="title"><b>Outras Avaliações</b></div>
                    <div className="question">
                        {
                            feedbacks &&
                            feedbacks.map(feedback => {
                                return (
                                    <div className="cardRouteFeedback">   
                                        <div>{feedback.text}</div>
                                        <br />
                                        <Rating
                                            value={feedback.rating}
                                            precision={0.25}
                                            readOnly
                                        ></Rating>
                                    </div>
                                )
                            })



                            // feedbacks &&
                            // feedbacks.filter(feedback => {
                            //     return (
                            //         <div className="cardRouteFeedback">
                            //             <div>{feedback.text}</div>
                            //             <br />
                            //             <br />
                            //             <Rating
                            //                 value={feedback.rating} 
                            //                 precision={0.25} 
                            //                 readOnly
                            //             ></Rating>
                            //         </div>
                            //     )
                            // })
                        }
                    </div>
                </form>
            </main>

        </div>
    )
}
