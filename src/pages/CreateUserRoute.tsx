/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, FormEvent, useState } from 'react';
import { useAuth } from '../hooks/userAuth'
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { SideBar } from '../components/SideBar'

import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { format } from 'date-fns';

//SCSS
import '../styles/question.scss';

import api from '../services/api';


export function CreateUserRoute() {
    const [places, setPlaces] = useState('');
    const [loading, setLoading] = useState(false);
    const [newPlaces, setNewPlaces] = useState(false);
    const [date, setDate] = useState<Date | null>(new Date());
    const { user, signInWithGoogle } = useAuth()
    const history = useHistory();

    let placesNew: Boolean = true


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlaces(event.target.checked);
        console.log(newPlaces)
    };

    async function handleCreateRoute(event: FormEvent) {
        event.preventDefault();

        let responseDataGet: any = undefined
        let responseDataPut: any = undefined
        setLoading(true);

        await api.get(`answers/${user?.id}`)
            .then(response => {
                responseDataGet = response.data;
            }).catch(error => {
                console.log(error);
            })

        if (responseDataGet !== undefined) {
            const json = {
                ...responseDataGet,
                "placesCount": parseInt(places),
                "takeNewPlaces": newPlaces,
                "routeDateAndTime": date ? `${format(date, 'yyyy-MM-dd')}T${format(date, 'HH:mm:ss.000')}Z` : null
            }

            console.log(json)

            await api.put(`answers`, JSON.stringify(json))
                .then(response => {
                    responseDataPut = response.status;
                }).catch(error => {
                    console.log(error);
                })

            if (responseDataPut === 200) {

                await api.post(`Routes`, JSON.stringify(json))
                    .then(response => {
                        if (response.status === 200) {
                            setLoading(false);
                            history.push('/UserRoutes', response.data)
                        };
                    }).catch(error => {
                        console.log(error);
                    })
            }
        }
    }

    return (
        <div id="page-room">
            <SideBar></SideBar>
            <main>
                <form>
                    <div className="question">
                        Quantos lugares você deseja visitar?
                        <br />
                        <TextField
                            variant="standard"
                            margin="normal"
                            type="number"
                            label="Qtde de Lugares"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={event => { setPlaces(event.target.value); console.log(`Quantidade de Lugares: ${event.target.value}`) }}
                        />
                    </div>

                    <div className="question">
                        Data e Hora de Inicio do passeio
                        <br />
                        <br />
                        <Fragment>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    label="Inicio"
                                    inputVariant="outlined"
                                    value={date}
                                    onChange={setDate}
                                    format="dd/MM/yyyy HH:mm"
                                    ampm={false}
                                />
                            </MuiPickersUtilsProvider>
                        </Fragment>
                    </div>
                    <div className="question">
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    defaultChecked 
                                    color="primary"
                                    />}
                                label="Somente novos lugares"
                                checked={newPlaces}
                            />
                        </FormGroup>
                    </div>
                    <div className="form-footer">
                        {loading ?
                            <Loader></Loader>
                            :
                            <Button onClick={handleCreateRoute}>Criar Rota</Button>
                        }
                    </div>
                </form>
            </main>
        </div>
    )
}