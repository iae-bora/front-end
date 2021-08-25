//React Router DOM
import { Route, BrowserRouter, Switch} from 'react-router-dom'


import { AuthContextProvider } from './contexts/AuthContext';

//Componentes
import { Login } from './pages/Login'
import { Question } from './pages/Question';

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/Question" component={Question}/>
      </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
