import { useHistory } from 'react-router-dom'
import { FormEvent} from 'react'

import { useAuth } from '../hooks/userAuth'

//Importando as imagens
// import illustrationImg from '../assets/images/illustration.svg'
// import logoImg from '../assets/images/logo.svg'
// import googleIconImg from '../assets/images/google-icon.svg'

//Importando o hook de authentication

import '../styles/auth.scss';
// import { database } from '../services/firebase'


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


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
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      background: '#115293',
      color: '#fff',
    },
  }));

//Criando um componente
export function Login() {
    //Utilizando um hook para fazer a navegação - Somente dentro do componente
    const history = useHistory();
    const classes = useStyles();

    //Recuperando informações de um contexto
    const {signInWithGoogle} = useAuth()

    //Função responsavel por navegar para outra pagina NewRoom 
    async function handleQuestions(event:FormEvent){
        event.preventDefault();
        //Se o usuário não estiver logado
        await signInWithGoogle()
        //Redirecionando a outra pagina
        history.push('/Question')
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
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        autoComplete="address"
                        autoFocus
                        />
                </form>
                <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick = {handleQuestions}
                        >
                        Sign In
                        </Button>
            </div>
            </main>
        </div>
    )
}