import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Greet from "./Component/Greet";
import LoginForm from "./Component/LoginForm";
import RegisterForm from "./Component/RegisterForm";
import PrivateRoute from "./ProtectedRoute";

export const AuthContext = React.createContext();

function App() {
    const [authTokens, setAuthTokens] = useState(null);
    const setToken = (token) => {
        localStorage.setItem("token",token);
        setAuthTokens(token);
        console.log(token)
    }

  return (
      <AuthContext.Provider value={{authTokens,setAuthTokens:setToken}}>
      <main>
          <Switch>
              <Route path="/" component={Greet} exact/>
              <Route path="/login" component={LoginForm} exact/>
              <Route path="/register" component={RegisterForm} exact/>

          </Switch>
      </main>
      </AuthContext.Provider>
  );
}

export default App;
