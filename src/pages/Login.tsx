//Import responsavel pela navegação da aplicação - React-Router-DOM
import { useHistory } from 'react-router-dom'

//Importando as imagens
import logoImg from '../assets/images/Logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

//Importando o hook de authentication
import { useAuth } from '../hooks/userAuth'

import '../styles/auth.scss';
// import { FormEvent } from 'react'
// import { useState } from 'react'
// import { database } from '../services/firebase'

//Criando um componente
export function Login() {
    //Utilizando um hook para fazer a navegação - Somente dentro do componente
    const history = useHistory();

    //Recuperando informações de um contexto
    const {user, signInWithGoogle} = useAuth()

    // const [roomCode, setRoomCode] = useState('');

    //Função responsavel por navegar para outra pagina NewRoom
    async function handleSignIn(){
        //Se o usuário não estiver logado
        // if(!user){
            await signInWithGoogle()
        // }

        //Retornando informações do usuário logado
        console.log(user?.name)
        console.log(user?.id)
        console.log(user?.avatar)

        //Redirecionando a outra pagina
        history.push('/Question')
    }


    // async function handleJoinRoom(event:FormEvent) {
    //     event.preventDefault();

    //     if(roomCode.trim() === ''){
    //         return;
    //     }

    //     //Buscando se a sala realmente existe para que o usuário posssa entrar
    //     // const roomRef = await database.ref(`rooms/${roomCode}`).get();

    //     // if(!roomRef.exists()){
    //     //     alert('Room does not exists.');
    //     //     return;
    //     // }

    //     //Caso exista usuário será redirecionado
    //     // history.push(`/rooms/${roomCode}`);
    // }


    return(
        <div id="page-auth">
            <aside>
                <img src={logoImg} alt="Logo Iae Bora"/>
                <strong>Realize passeios na região do ABC</strong>
                <p>Desfrute das melhores rotas e eventos perto de você</p>
            </aside>
            <main>
                <div className="main-content">
                    <Button onClick={handleSignIn} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"></img>
                        Entre com a conta google
                    </Button>
                    {/* <div className="separator">ou insira seu login</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite seu usuário"
                            onChange = {event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <input
                            type="text"
                            placeholder="Digite sua senha"
                            onChange = {event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Login
                        </Button>
                    </form> */}
                </div>
            </main>
        </div>
    )
}