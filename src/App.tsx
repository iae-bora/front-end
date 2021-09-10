//React Router DOM
import { Route, BrowserRouter, Switch} from 'react-router-dom'


import { AuthContextProvider } from './contexts/AuthContext';

//Componentes
import { Login } from './pages/Login'
import { Question } from './pages/Question';
import { Home } from './pages/Home';


function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/Question" component={Question}/>
        <Route path="/Home" component={Home}/>
      </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
