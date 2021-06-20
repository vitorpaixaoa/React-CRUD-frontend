import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListClientsComponent from './components/ListClientsComponent';
import LoginComponent from './components/LoginComponent';
import NewClientComponent from './components/NewClientComponent';
import RegisterComponent from './components/RegisterComponent';
import UpdateClientComponent from './components/UpdateClientComponent';
import UserDetailsComponent from './components/UserDetailComponent';

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent />
                <div className="container mainContainer">
                    <Switch>
                        <Route path="/" exact component={ListClientsComponent} ></Route>
                        <Route path="/clients" component={ListClientsComponent} ></Route>
                        <Route path="/new-client" component={NewClientComponent} ></Route>
                        <Route path="/update-client/:id" component={UpdateClientComponent} ></Route>
                        <Route path="/login" component={LoginComponent} ></Route>
                        <Route path="/register" component={RegisterComponent} ></Route>
                        <Route path="/client-detail/:id" component={UserDetailsComponent} ></Route>
                    </Switch>
                </div>
                {/* <FooterComponent /> */}
            </Router>
        </div>

    );
}

export default App;
