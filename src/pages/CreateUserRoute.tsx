/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, FormEvent, useState } from 'react';
import { useAuth } from '../hooks/userAuth'
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { Button } from '../components/Button';

import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { DateTimePicker } from "@material-ui/pickers";
import { format } from 'date-fns';

//SCSS
import '../styles/question.scss';

import api from '../services/api';


export function CreateUserRoute() {
    const [places, setPlaces] = useState('');
    const [date, setDate] = useState<Date | null>(new Date());
    const { user, signInWithGoogle } = useAuth()
    const history = useHistory();

    async function handleCreateRoute(event: FormEvent) {
        event.preventDefault();
        console.log(`PlacesCount: ${places}`)
        // console.log(`Date: ${format(date, 'dd-MM-yyyy hh:mm:ss')}`)
        
        let responseDataGet: any = undefined
        let responseDataPut: any = undefined

        await api.get(`answers/${user?.id}`)
        .then(response => {
            responseDataGet = response.data;
        }).catch(error => {
            console.log(error);
        })

        if(responseDataGet !== undefined){
            const json = {
                ...responseDataGet,
                "placesCount": parseInt(places),
                "routeDateAndTime": date ? `${format(date,'yyyy-MM-dd')}T${format(date,'HH:mm:ss.000')}Z` : null
            }

            console.log(json)

            await api.put(`answers`, JSON.stringify(json))
            .then(response => {
                responseDataPut = response.status;
                console.log(responseDataPut)
            }).catch(error => {
                console.log(error);
            })

            if(responseDataPut === 200){

                await api.post(`Routes`,JSON.stringify(json))
                .then(response => {
                    console.log(`entrou ${response.status}`)
                    if(response.status === 200){
                        history.push('/UserRoutes',response.data)
                    };
                }).catch(error =>{
                    console.log(error);
                })
            }
        }
    }

return (
    <div id="page-room">
        <header>
            <div className="content">
                <h2>Criando Nova Rota</h2>
            </div>
        </header>

        <main>
            <form>
                <div className="question">
                    Quantos lugares você deseja visitar?
                    <br />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="quantidadeLugares"
                        label="Qtde de Lugares"
                        // autoFocus
                        onChange={event => { setPlaces(event.target.value); console.log(`Quantidade de Lugares: ${event.target.value}`) }}
                    // onClick={()=>handleAnswerQuestionEight()}
                    />
                </div>
                <div className="question">
                    Data e Hora de Inicio do passeio
                    <br />
                    <br />
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
                        {/* <DateTimePicker
                            value={date}
                            format='yyyy-MM-dd hh:mm:ss'
                            disablePast
                            onChange={event => { setDate(date); console.log(`Data: ${date}`) }}
                            // label="With Today Button"
                            showTodayButton
                        /> */}
                        <Fragment>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                label="DateTimePicker"
                                inputVariant="outlined"
                                value={date}
                                onChange={setDate}
                                />
                            </MuiPickersUtilsProvider>
                        </Fragment>
                    {/* </MuiPickersUtilsProvider> */}
                </div>
                <div className="form-footer">
                    <Button
                        // type="submit"
                        onClick={handleCreateRoute}
                    >
                        Criar Rota
                    </Button>
                    {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                    Respostas Enviadas com sucesso
                                </Alert>
                            </Snackbar> */}
                    {/* <Alert severity="error">This is an error message!</Alert>
                                <Alert severity="warning">This is a warning message!</Alert>
                                <Alert severity="info">This is an information message!</Alert>
                                <Alert severity="success">This is a success message!</Alert> */}
                </div>
            </form>
        </main>
    </div>
)
}