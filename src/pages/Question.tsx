    //#region Imports
    //Biblioteca responsavel por armazenar os parametros passados na rota da pagina
    import { FormEvent, useState } from 'react';
    import { useHistory } from 'react-router-dom';
    import { useAuth } from '../hooks/userAuth'

    //Componentes
    import { Button } from '../components/Button';
    import { LabelQuestion } from '../components/LabelQuestion';
    import TextField from '@material-ui/core/TextField';

    //Alert - Material UI
    import Snackbar from '@material-ui/core/Snackbar';
    import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

    //SCSS
    import '../styles/question.scss';

    import api from '../services/api';

    //#endregion

    type User = {
        googleId: string;
        address: string;
    }

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    export function Question() {
        const { user, signInWithGoogle } = useAuth()

        const [open, setOpen] = useState(false);

        //#region Variaveis
        const history = useHistory();

        //States de cada uma das perguntas
        const [radioQuestion1, setRadioQuestion1] = useState('');
        const [radioQuestion2, setRadioQuestion2] = useState('');
        const [radioQuestion3, setRadioQuestion3] = useState('');
        const [radioQuestion4, setRadioQuestion4] = useState('');
        const [radioQuestion5, setRadioQuestion5] = useState('');
        const [radioQuestion6, setRadioQuestion6] = useState('');
        const [radioQuestion7, setRadioQuestion7] = useState('');
        const [places, setPlaces] = useState('');
        const [age, setAge] = useState('');

        const answersQuestionOne = ["Rock", "Sertanejo", "Forró", "Gospel", "Pop", "Funk", "RAP"]
        const answersQuestionTwo = ["Churrasco", "Caseira", "Vegetariana", "Fast Food", "Japonesa", "Italiana"]
        const answersQuestionThree = ["Drama", "Ação", "Aventura", "Romance", "Animação", "Suspense", "Terror", "Comédia"]
        const answersQuestionFour = ["Futebol", "Basquete", "Volei", "Tênis", "Lutas"]
        const answersQuestionFive = ["Palmeiras", "Corinthians", "Santos", "São Paulo", "Nenhum"]
        const answersQuestionSix = ["Cristianismo", "Hinduísmo", "Budismo", "Judaísmo", "Espiritismo", "Nenhuma"]
        const answersQuestionSeven = ["Não", "Sim"]

        var positionAnswerOne: number,
            positionAnswerTwo: number,
            positionAnswerThree: number,
            positionAnswerFour: number,
            positionAnswerFive: number,
            positionAnswerSix: number,
            positionAnswerSeven: number;
        //#endregion

        //#region Functions
        function handleAnswerQuestionOne(answerText: string) {
            positionAnswerOne = answersQuestionOne.indexOf(answerText);
            console.log(`Resposta 1: ${positionAnswerOne} - ${answerText}`)
        }

        function handleAnswerQuestionTwo(answerText: string) {
            positionAnswerTwo = answersQuestionTwo.indexOf(answerText);
            console.log(`Resposta 2: ${positionAnswerTwo} - ${answerText}`)
        }

        function handleAnswerQuestionThree(answerText: string) {
            positionAnswerThree = answersQuestionThree.indexOf(answerText);
            console.log(`Resposta 3: ${positionAnswerThree} - ${answerText}`)
        }

        function handleAnswerQuestionFour(answerText: string) {
            positionAnswerFour = answersQuestionFour.indexOf(answerText);
            console.log(`Resposta 4: ${positionAnswerFour} - ${answerText}`)
        }

        function handleAnswerQuestionFive(answerText: string) {
            positionAnswerFive = answersQuestionFive.indexOf(answerText);
            console.log(`Resposta 5: ${positionAnswerFive} - ${answerText}`)
        }

        function handleAnswerQuestionSix(answerText: string) {
            positionAnswerSix = answersQuestionSix.indexOf(answerText);
            console.log(`Resposta 6: ${positionAnswerSix} - ${answerText}`)
        }

        function handleAnswerQuestionSeven(answerText: string) {
            positionAnswerSeven = answersQuestionSeven.indexOf(answerText);
            console.log(`Resposta 7: ${positionAnswerSeven} - ${answerText}`)
        }

        function handleSendJson(event: FormEvent) {
            event.preventDefault();
            //#endregion
        }

        const handleClick = async () => {
            setOpen(true);

            //Montando Array de Respostas
            const answers = [
                answersQuestionOne.indexOf(radioQuestion1).toString(),
                answersQuestionTwo.indexOf(radioQuestion2).toString(),
                answersQuestionThree.indexOf(radioQuestion3).toString(),
                answersQuestionFour.indexOf(radioQuestion4).toString(),
                answersQuestionFive.indexOf(radioQuestion5).toString(),
                answersQuestionSix.indexOf(radioQuestion6).toString(),
                answersQuestionSeven.indexOf(radioQuestion7).toString()
            ]

            //Realizando Requisição para pegar o endereço do usuário
            let responseData: any = undefined
            await api.get(`users/${user?.id}`)
                .then(response => {
                    responseData = response.data;
                    console.log(responseData)
                }).catch(error => {
                    console.log(error);
                })

            if (responseData !== undefined) {
                //Preenchendo JSON de envio  
                var json = {
                    "musics": answersQuestionOne.indexOf(radioQuestion1),
                    "food": answersQuestionTwo.indexOf(radioQuestion2),
                    "movies": answersQuestionThree.indexOf(radioQuestion3),
                    "religion": answersQuestionSix.indexOf(radioQuestion6),
                    "sports": answersQuestionFour.indexOf(radioQuestion4),
                    "teams": answersQuestionFive.indexOf(radioQuestion5),
                    "haveChildren": answersQuestionSeven.indexOf(radioQuestion7),
                    "userAge": +age,
                    "placesCount": +places,
                    "user": {
                        "googleId": user?.id,
                        "address": responseData.address
                    }
                }

                console.log(json)
                //#endregion
                if (answers.includes('-1')) {
                    alert('Favor preencher todos as respostas corretamente')
                }
                else {
                    await api.post(`answers`,JSON.stringify(json))
                    .then(response => {
                        responseData = response.status;
                    }).catch(error =>{
                        console.log(error);
                    })

                    if(responseData === 200){
                        alert('Respostas salvas com sucesso')
                        history.push('/Home')
                    }
                    else{
                        alert('Erro ao salvar as respostas')
                    }
                }
            }

        };

        const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
        };


        return (
            <div id="page-room">
                <header>
                    <div className="content">
                        {/* <img src={logoImg} alt="iaeBora"/> */}
                        <h2>Definindo Perfil do Usuário</h2>
                    </div>
                </header>   

                <main>
                    <form onSubmit={handleSendJson}>

                        {/* Pergunta 1 */}
                        <div className="question">
                            Qual gênero musical você mais gosta?
                            <br />
                            {answersQuestionOne.map(answer => {
                                return (
                                    <LabelQuestion
                                        key={answer}
                                        text={answer}
                                        onChange={event => setRadioQuestion1(event.target.value)}
                                        checked={radioQuestion1 === answer}
                                        onClick={() => handleAnswerQuestionOne(answer)}
                                    />
                                );
                            })}
                        </div>

                        {/* Pergunta 2 */}
                        <div className="question">
                            Qual o seu tipo de comida favorito?
                            <br />
                            {answersQuestionTwo.map(answer => {
                                return (
                                    <LabelQuestion
                                        key={answer}
                                        text={answer}
                                        onChange={event => setRadioQuestion2(event.target.value)}
                                        checked={radioQuestion2 === answer}
                                        onClick={() => handleAnswerQuestionTwo(answer)}
                                    />
                                );
                            })}
                        </div>

                        {/* Pergunta 3 */}
                        <div className="question">
                            Qual o seu estilo de filme favorito?
                            <br />
                            {answersQuestionThree.map(answer => {
                                return (
                                    <LabelQuestion
                                        key={answer}
                                        text={answer}
                                        onChange={event => setRadioQuestion3(event.target.value)}
                                        checked={radioQuestion3 === answer}
                                        onClick={() => handleAnswerQuestionThree(answer)}
                                    />
                                );
                            })}
                        </div>

                        {/* Pergunta 4 */}
                        <div className="question">
                            Qual seu esporte favorito?
                            <br />
                            {answersQuestionFour.map(answer => {
                                return (
                                    <LabelQuestion
                                        key={answer}
                                        text={answer}
                                        onChange={event => setRadioQuestion4(event.target.value)}
                                        checked={radioQuestion4 === answer}
                                        onClick={() => handleAnswerQuestionFour(answer)}
                                    />
                                );
                            })}
                        </div>

                        {/* Pergunta 5 */}
                        <div className="question">
                            Torce para algum time?
                            <br />
                            {answersQuestionFive.map(answer => {
                                return (
                                    <LabelQuestion
                                        key={answer}
                                        text={answer}
                                        onChange={event => setRadioQuestion5(event.target.value)}
                                        checked={radioQuestion5 === answer}
                                        onClick={() => handleAnswerQuestionFive(answer)}
                                    />
                                );
                            })}
                        </div>

                        {/* Pergunta 6 */}
                        <div className="question">
                            Possui alguma religião?
                            <br />
                            {answersQuestionSix.map(answer => {
                                return (
                                    <LabelQuestion
                                        key={answer}
                                        text={answer}
                                        onChange={event => setRadioQuestion6(event.target.value)}
                                        checked={radioQuestion6 === answer}
                                        onClick={() => handleAnswerQuestionSix(answer)}
                                    />
                                );
                            })}
                        </div>

                        {/* Pergunta 7 */}
                        <div className="question">
                            Tem filhos?
                            <br />
                            {answersQuestionSeven.map(answer => {
                                return (
                                    <LabelQuestion
                                        key={answer}
                                        text={answer}
                                        onChange={event => setRadioQuestion7(event.target.value)}
                                        checked={radioQuestion7 === answer}
                                        onClick={() => handleAnswerQuestionSeven(answer)}
                                    />
                                );
                            })}
                        </div>

                        {/* Pergunta 8 */}
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
                        {/* Pergunta 9 */}
                        <div className="question">
                            Qual sua idade?
                            <br />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                id="age"
                                label="Informe sua idade"
                                // autoFocus
                                onChange={event => { setAge(event.target.value); console.log(`Age: ${event.target.value}`) }}
                            // onClick={()=>handleAnswerQuestionEight()}
                            />
                        </div>
                        {/* <div className="question">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify='flex-start'>
                                <KeyboardDatePicker
                                    variant='dialog'
                                    format='dd/MM/yyyy'
                                    margin='normal'
                                    id='date-picker'
                                    label='Data de Nascimento'
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date'
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div> */}
                        <div className="form-footer">
                            <Button
                                type="submit"
                                onClick={handleClick}
                            >
                                Enviar Respostas
                            </Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                    Respostas Enviadas com sucesso
                                </Alert>
                            </Snackbar>
                            {/* <Alert severity="error">This is an error message!</Alert>
                                <Alert severity="warning">This is a warning message!</Alert>
                                <Alert severity="info">This is an information message!</Alert>
                                <Alert severity="success">This is a success message!</Alert> */}
                        </div>
                    </form>
                </main>
            </div>
        );
    }



