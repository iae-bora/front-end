import { useHistory } from 'react-router-dom'
import { FormEvent, useState} from 'react'
// import axios from 'axios'


import { useAuth } from '../hooks/userAuth'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import '../styles/auth.scss';
import api from '../services/api';


//Criando um componente
export function Login() {
    //Utilizando um hook para fazer a navegação - Somente dentro do componente
    const history = useHistory();
    const classes = useStyles();
    const [CEP, setCEP] = useState('');
    const [data, setData] = useState([]);

    //Recuperando informações de um contexto
    const {user, signInWithGoogle} = useAuth()

    //Função responsavel por navegar para outra pagina NewRoom 
    async function handleLogin(event:FormEvent){
        event.preventDefault();
        //Se o usuário não estiver logado
        let userResponse = await signInWithGoogle()
        // console.log(userResponse)
        //Variaveis que armazenará a resposta e o id do Usuário
        let responseDataUser, responseDataAnswer, userId = userResponse?.id

        console.log(`UserID: ${user?.id}`)

        //JSON para realizar um GET 
        const json = {"googleId":userId,
        "address":CEP}

        await api.get(`users/${userId}`)
        .then(response => {
            setData(response.data);
            responseDataUser = response.status;
        }).catch(error =>{
          console.log(error);
        })

        console.log(`Users: ${responseDataUser}`)

        if(responseDataUser === 200){      

          await api.get(`answers/${userId}`)
          .then(response => {
              setData(response.data);
              responseDataAnswer = response.status;
          }).catch(error =>{
            console.log(error);
          })

          console.log(`Answers: ${responseDataAnswer}`)

          if(responseDataAnswer === 200)
            history.push('/Home')
          else 
            history.push('/Question')
        }
        else if(responseDataUser !== 200 ){
          if(CEP.length > 0){
            await api.post(`users`,json)
            .then(response => {
                setData(response.data);
                responseDataUser = response.data;
            }).catch(error =>{
              console.log(error);
            })
            console.log(`Users 1: ${responseDataUser}`)

            alert('Usuário cadastrado com sucesso')
          }
          else{
            alert('Usuário não cadastrado, preencha o campo CEP e tente novamente')
            return
          }
        }
    }

    return(
        <div id="page-auth">
            <aside>
                <strong>Descubra as melhores rotas no ABC</strong>
                <p>Passeios e eventos mais perto de você</p>
            </aside>
            <main>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in to Iae Bora
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="address"
                        label="CEP"
                        name="address"
                        autoComplete="CEP"
                        autoFocus
                        onChange = {event => setCEP(event.target.value)}
                        />
                </form>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick = {handleLogin}
                >
                  Sign In
                </Button>
            </div>
            </main>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    background: '#115293',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#115293',
    color: '#fff',
  },
}));