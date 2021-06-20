import axios from 'axios'
import authHeader from './AuthHeader';

const CLIENTS_API_BASE_URL = "http://localhost:8080/api/v1/clients";


class ClientsService{

    getClients(){
         return axios.get(CLIENTS_API_BASE_URL, { headers: authHeader() });
    }

    newClient(client){
        return axios.post(CLIENTS_API_BASE_URL, client, { headers: authHeader() } );
    }

    getClientById(clientId){
        return axios.get(CLIENTS_API_BASE_URL + "/" + clientId, { headers: authHeader() });
    }

    updateCliente(client, clientId){
        return axios.put(CLIENTS_API_BASE_URL + "/" + clientId, client, { headers: authHeader() })
    }

    removeClient(clientId){
        return axios.delete(CLIENTS_API_BASE_URL + "/" + clientId, { headers: authHeader() })
    }
}

export default new ClientsService();