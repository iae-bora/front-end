//Biblioteca responsavel por armazenar os parametros passados na rota da pagina
import { useState } from 'react';

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//image
import logoImg from '../assets/images/Logo.svg';

//Componentes
import { Button } from '../components/Button';
import { LabelQuestion } from '../components/LabelQuestion';

// import { useAuth } from '../hooks/userAuth';

import '../styles/question.scss';

export function Question(){
    // const {user} = useAuth();

    //#region Variaveis

    //States de cada uma das perguntas
    const [radioQuestion1, setRadioQuestion1] = useState('');
    const [radioQuestion2, setRadioQuestion2] = useState('');
    const [radioQuestion3, setRadioQuestion3] = useState('');
    const [radioQuestion4, setRadioQuestion4] = useState('');
    const [radioQuestion5, setRadioQuestion5] = useState('');
    const [radioQuestion6, setRadioQuestion6] = useState('');
    const [radioQuestion7, setRadioQuestion7] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const answersQuestionOne = ["Rock","Sertanejo","Forró","Gospel","Pop","Funk","RAP"]
    const answersQuestionTwo = ["Churrasco","Caseira","Vegetariana","Fast Food","Japonesa","Italiana"]
    const answersQuestionThree = ["Drama","Ação","Aventura","Romance","Animação","Suspense","Terror","Comédia"]
    const answersQuestionFour = ["Futebol","Basquete","Volei","Tênis","Lutas"]
    const answersQuestionFive = ["Palmeiras","Corinthians","Santos","São Paulo","Nenhum"]
    const answersQuestionSix = ["Cristianismo","Judeu","Hinduísmo","Budismo","Judaísmo","Espiritismo","Nenhuma"]
    const answersQuestionSeven = ["Sim","Não"]

    var positionAnswerOne: number, 
    positionAnswerTwo: number, 
    positionAnswerThree: number, 
    positionAnswerFour: number, 
    positionAnswerFive: number, 
    positionAnswerSix: number, 
    positionAnswerSeven : number;
    //#endregion
    
function handleAnswerQuestionOne(answerText: string){
     positionAnswerOne = answersQuestionOne.indexOf(answerText);
     console.log(`Resposta 1: ${positionAnswerOne} - ${answerText}`)
 } 

function handleAnswerQuestionTwo(answerText: string){
    positionAnswerTwo = answersQuestionTwo.indexOf(answerText);
    console.log(`Resposta 2: ${positionAnswerTwo} - ${answerText}`)
} 

function handleAnswerQuestionThree(answerText: string){
    positionAnswerThree = answersQuestionThree.indexOf(answerText);
    console.log(`Resposta 3: ${positionAnswerThree} - ${answerText}`)
} 

function handleAnswerQuestionFour(answerText: string){
    positionAnswerFour = answersQuestionFour.indexOf(answerText);
    console.log(`Resposta 4: ${positionAnswerFour} - ${answerText}`)
} 

function handleAnswerQuestionFive(answerText: string){
    positionAnswerFive = answersQuestionFive.indexOf(answerText);
    console.log(`Resposta 5: ${positionAnswerFive} - ${answerText}`)
} 

function handleAnswerQuestionSix(answerText: string){
    positionAnswerSix = answersQuestionSix.indexOf(answerText);
    console.log(`Resposta 6: ${positionAnswerSix} - ${answerText}`)
} 

function handleAnswerQuestionSeven(answerText: string){
    positionAnswerSeven = answersQuestionSeven.indexOf(answerText);
    console.log(`Resposta 7: ${positionAnswerSeven} - ${answerText}`)
} 

function handleSendJson(){
    // var texto = '{"atributo1": "valor 1", "atributo2": 23}';
    var text = {"Musics": answersQuestionOne.indexOf(radioQuestion1).toString(),
                 "Foods": answersQuestionTwo.indexOf(radioQuestion2).toString(),
                 "Movies": answersQuestionThree.indexOf(radioQuestion3).toString(),
                 "Sports": answersQuestionFour.indexOf(radioQuestion4).toString(),
                 "Teams": answersQuestionFive.indexOf(radioQuestion5).toString(),
                 "Religions": answersQuestionSix.indexOf(radioQuestion6).toString(),
                 "HaveChildren": answersQuestionSeven.indexOf(radioQuestion7).toString(),
                 "DateBirthday": startDate?.getDate() + '/' + startDate?.getUTCMonth() + '/' + startDate?.getFullYear()}

    console.log(text);
}

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="iaeBora"/>
                <h1>Perguntas</h1>
                </div>
            </header>

            <main>
                <form>
                    {/* Pergunta 1 */}
                    <div className="question">
                        Qual gênero musical você mais gosta?
                        <br/>
                        {answersQuestionOne.map(answer => {
                            return(
                                <LabelQuestion
                                    key ={answer} 
                                    text= {answer} 
                                    onChange= {event => setRadioQuestion1(event.target.value)}
                                    checked= {radioQuestion1 === answer}
                                    onClick = { () => handleAnswerQuestionOne(answer)}
                                />
                            );
                        })}
                    </div>

                    {/* Pergunta 2 */}
                    <div className="question">
                        Qual o seu tipo de comida favorito?
                        <br/>
                        {answersQuestionTwo.map(answer => {
                            return(
                                <LabelQuestion 
                                    key ={answer}
                                    text={answer} 
                                    onChange={event => setRadioQuestion2(event.target.value)}
                                    checked={radioQuestion2 === answer}
                                    onClick = { () => handleAnswerQuestionTwo(answer)}
                                />
                            );
                        })}
                    </div>

                    {/* Pergunta 3 */}
                    <div className="question">
                        Qual o seu estilo de filme favorito?
                        <br/>
                        {answersQuestionThree.map(answer => {
                            return(
                                <LabelQuestion 
                                    key ={answer}
                                    text={answer} 
                                    onChange={event => setRadioQuestion3(event.target.value)}
                                    checked={radioQuestion3 === answer}
                                    onClick = { () => handleAnswerQuestionThree(answer)}
                                />
                            );
                        })}
                    </div>

                    {/* Pergunta 4 */}
                    <div className="question">
                        Qual seu esporte favorito?
                        <br/>
                        {answersQuestionFour.map(answer => {
                            return(
                                <LabelQuestion 
                                    key ={answer}
                                    text={answer} 
                                    onChange={event => setRadioQuestion4(event.target.value)}
                                    checked={radioQuestion4 === answer}
                                    onClick = { () => handleAnswerQuestionFour(answer)}
                                />
                            );
                        })}
                    </div>

                    {/* Pergunta 5 */}
                    <div className="question">
                        Torce para algum time? 
                        <br/>
                        {answersQuestionFive.map(answer => {
                            return(
                                <LabelQuestion 
                                    key ={answer}
                                    text={answer} 
                                    onChange={event => setRadioQuestion5(event.target.value)}
                                    checked={radioQuestion5 === answer}
                                    onClick = { () => handleAnswerQuestionFive(answer)}
                                />
                            );
                        })}
                    </div>
                    
                    {/* Pergunta 6 */}
                    <div className="question">
                        Possui alguma religião? 
                        <br/>
                        {answersQuestionSix.map(answer => {
                            return(
                                <LabelQuestion 
                                    key ={answer}
                                    text={answer} 
                                    onChange={event => setRadioQuestion6(event.target.value)}
                                    checked={radioQuestion6 === answer}
                                    onClick = { () => handleAnswerQuestionSix(answer)}
                                />
                            );
                        })}
                    </div>

                    {/* Pergunta 7 */}
                    <div className="question">
                        Tem filhos?
                        <br/>
                        {answersQuestionSeven.map(answer => {
                            return(
                                <LabelQuestion 
                                    key ={answer} 
                                    text={answer} 
                                    onChange={event => setRadioQuestion7(event.target.value)}
                                    checked={radioQuestion7 === answer}
                                    onClick = { () => handleAnswerQuestionSeven(answer)}
                                />
                            );
                        })}
                    </div>
                    <div>
                        <DatePicker selected={startDate} onChange={(date : Date | null) => setStartDate(date)}/>
                    </div>
                </form>
                <div className="form-footer">
                    <Button onClick = { () => handleSendJson()}>
                            Enviar Respostas
                    </Button>
                    </div>
            </main>
        </div>
    );
}
