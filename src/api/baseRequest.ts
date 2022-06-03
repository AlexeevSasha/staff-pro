import {errorNotification} from "../common/components/Notification";

export const BASE_URL = 'http://localhost:3004/'

interface IData  {
    method: "POST" | 'GET' | 'PATCH' | 'DELETE',
    body?: string
}

const request = async (url: string, data: IData) => {
    const response = await fetch(url, {
        ...data,
        headers: {
            "Content-type": "application/json;charset=utf-8"
        }
    });
    if (response.ok) {
        if (response.headers.get('Content-Length') === '0') {
            return true
        }
        const typeResponse = response.headers.get("Content-type");
        let result;
        if (typeResponse === 'aplication/text') {
            result = await response.text()
            return result
        }
        result = await response.json()
        return result;
    } else {
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("user");
            errorNotification("Unauthorized user")
            throw new Error("Unauthorized user");
        }
        if (response.status === 409) {
            errorNotification("Already exists")
            throw new Error('Already exists')
        }
        else {
            const error =  new Error(response.statusText)
            errorNotification(error.message)
            return error.message
        }
    }

}

export const get = (url: string) => request(`${BASE_URL}${url}`, {method: "GET"})

export const post = (url: string, body: string ) => {
    return request(`${BASE_URL}${url}`, {method: "POST", body})
}
export const patch = (url: string, body: string) => {
    return request(`${BASE_URL}${url}`, {method: "PATCH", body})
}
export const remove = (url: string) => request(`${BASE_URL}${url}`, {method: "DELETE"})