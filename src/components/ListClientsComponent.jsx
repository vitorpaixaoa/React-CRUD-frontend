import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import ClientsService from '../services/ClientsService';

class ListClientsComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            currentUser: AuthService.getCurrentUser()
        }
        this.newClient = this.newClient.bind(this);
        this.editClient = this.editClient.bind(this);
    }

    componentDidMount() {

        const user = AuthService.getCurrentUser();

        if (!user) {
            this.props.history.push("/login");
        }

        ClientsService.getClients().then((res) => {
            this.setState({ clients: res.data });
        });
    }

    editClient(id) {
        this.props.history.push(`/update-client/${id}`);
    }

    moreInformation(id){
        this.props.history.push(`/client-detail/${id}`);

    }

    newClient() {
        this.props.history.push('/new-client');
    }



    deleteClient = (id) => {
        const remove = window.confirm("Deseja realmente excluir esse usuário?")
        if (remove) {
            ClientsService.removeClient(id).then(res => {
                this.setState({ clients: this.state.clients.filter(client => client.id !== id) })
            })
        }

    }
    render() {

        return (
            <div className="mainContainer">
                <h2 className="text-center">Lista de Clientes</h2>
                { this.state.currentUser && this.state.currentUser.roles.includes("ROLE_ADMIN") &&
                    <div className="btnNewClient">
                        <button className="btn btn-lg btn-default " style={{background: "#eb9721"}} onClick={this.newClient} >
                            Adicionar um Cliente
                        </button>
                    </div>
                }

                <div className="row">
                    <table className="table table-striped main-list table-bordered">


                        <thead>
                            <tr>
                                <th>Nome do Cliente</th>
                                <th>Email do Cliente</th>
                                <th>CPF do Cliente</th>
                                <th>Opções</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.clients.map(
                                    client =>
                                        <tr key={client.id}>
                                            <td> {client.name} </td>
                                            <td> {client.email} </td>
                                            <td> {client.cpf} </td>
                                            <td>
                                                <button className="btn btn-success" style={{ marginLeft: "5px" }} onClick={() => this.moreInformation(client.id)}>Ver mais</button>
                                                {this.state.currentUser.roles.includes("ROLE_ADMIN") &&
                                                    <button className="btn btn-info" style={{ marginLeft: "5px" }} onClick={() => this.editClient(client.id)}>Atualizar</button>
                                                }
                                                {this.state.currentUser.roles.includes("ROLE_ADMIN") &&
                                                    <button style={{ marginLeft: "5px" }} className="btn btn-danger" onClick={() => this.deleteClient(client.id)}>Remover</button>
                                                }


                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>


                    </table>
                </div>



            </div>
        );
    }
}

export default ListClientsComponent;