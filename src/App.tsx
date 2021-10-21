//React Router DOM
import { Route, BrowserRouter, Switch} from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext';

//Componentes
import { Login } from './pages/Login'
import { Question } from './pages/Question';
import { Home } from './pages/Home';
import { CreateUserRoute } from './pages/CreateUserRoute'
import { UserRoutes } from './pages/UserRoutes'
import { FeedBack } from './pages/FeedBack'


function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/Question" component={Question}/>
        <Route path="/Home" component={Home}/>
        <Route path="/CreateUserRoute" component={CreateUserRoute}/>
        <Route path="/UserRoutes" component={UserRoutes}/>
        <Route path="/FeedBack" component={FeedBack}/>
      </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
