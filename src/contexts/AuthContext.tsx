import { createContext, ReactNode, useState, useEffect } from 'react'

//importando services - Firebase
import { firebase, auth } from '../services/firebase'

type User = {
    id: string;
    name: string;
    avatar: string
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }

  type AuthContextProviderProps = {
      children: ReactNode;
  }

//Variavel de contexto - Passamos apenas o formato da variavel de contexto - Neste caso um objeto
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){
    const [user, setUser] = useState<User>();

    /**Função que será executada no momento em que o App for redenrizado
     * Irá no firebase para verificar se existia um usuário já autenticado na aplicação
     */
    useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(user =>{
       
        //Se retornar um usuário
          if(user){
          const {displayName, photoURL, uid} = user;
  
          //Verificar se as informações retornadas estão preenchidas
          if(!displayName || !photoURL){
            throw new Error('Missing information from Google Account.')
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
  
      //Para se descadastrar do eventListener e o mesmo não contiuar sendo executado
      return () =>{
        unsubscribe();
      }
  
    }, [])
  
    //Function de Login
    async function signInWithGoogle(){    
      //Autenticando o usuário no firebase via google
      const provider = new firebase.auth.GoogleAuthProvider();
  
      const result = await auth.signInWithPopup(provider);
  
      //Se retornar um usuário
      if(result.user){
        const {displayName, photoURL, uid} = result.user;
  
        //Verificar se as informações retornadas estão preenchidas
        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}> 
        {props.children}
        </AuthContext.Provider>
    );
}