import axios from "axios";
import Qs from 'qs';

const BASE_URL = "https://destifyfunc-api-dev.azurewebsites.net/api"

const token = 'trsmthTaK7p/CS6CSQamg0zB9xxmd9w5COrtM9vS1azadc4sksMYPA=='

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept" : 'application/json',
         "x-functions-key": token,
    }
})





export function fetchRoomInfo (params: any) {
        return instance.get(`/rooms`, {
            params : { roomIds: params.join(',') },
            //paramsSerializer: { serialize: (params: any) => Qs.stringify(params, {arrayFormat: 'repeat'})}
        })
          .then(response =>  response.data)
}

