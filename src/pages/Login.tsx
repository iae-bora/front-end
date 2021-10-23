/* eslint-disable @typescript-eslint/no-unused-vars */
import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import { useAuth } from '../hooks/userAuth'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactInputMask from 'react-input-mask'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import '../styles/auth.scss';
import api from '../services/api';
import { number } from 'prop-types';


//Criando um componente
export function Login() {
  //Utilizando um hook para fazer a navegação - Somente dentro do componente
  const history = useHistory();
  const classes = useStyles();
  const [CEP, setCEP] = useState('');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  //Recuperando informações de um contexto
  const { user, signInWithGoogle } = useAuth()

  //Função responsavel por navegar para outra pagina NewRoom 
  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    //Se o usuário não estiver logado
    let userResponse = await signInWithGoogle()
    //Variaveis que armazenará a resposta e o id do Usuário
    let responseDataUser, responseDataAnswer, userId = userResponse?.id

    //JSON para realizar um GET 
    const json = {
      "googleId": userId,
      "address": CEP
    }

    await api.get(`users/${userId}`)
      .then(response => {
        setData(response.data);
        responseDataUser = response.status;
      }).catch(error => {
        console.log(error);
      })

    if (responseDataUser === 200) {

      await api.get(`answers/${userId}`)
        .then(response => {
          setData(response.data);
          responseDataAnswer = response.status;
        }).catch(error => {
          console.log(error);
        })

      if (responseDataAnswer === 200)
        history.push('/CreateUserRoute')
      else
        history.push('/Question')
    }
    else if (responseDataUser !== 200) {
      if (CEP.length > 0) {
        await api.post(`users`, json)
          .then(response => {
            setData(response.data);
            responseDataUser = response.status;

            alert('Usuário cadastrado com sucesso')

            history.push('/Question')
          }).catch(error => {
            console.log(error);
            alert('Insira um CEP válido!!!')
          })
      }
      else {
        alert('Usuário não cadastrado, preencha o campo CEP e tente novamente')
        setShow(true);
        return
      }
    }
  }

  return (
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
            Sign in to IAe, Bora?
          </Typography>
          {
            show ?
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="address"
                  label="CEP"
                  name="address"
                  autoComplete="CEP"
                  type='number'
                  // autoFocus
                  inputProps={{ maxLength: 7 }}
                  onChange={event => setCEP(event.target.value)}
                />
              </form>
              : null
          }
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
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