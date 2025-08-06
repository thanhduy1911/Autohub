import { auth } from "@/auth";

const baseUrl = 'http://localhost:6001/';

async function getHeaders(): Promise<Headers> {
    const session = await auth();
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    if (session) {
        headers.set('Authorization', `Bearer ${session.accessToken}`);
    }

    return headers;
}

async function get(url: string) {
    const requestOption = {
        method: 'GET',
        headers: await getHeaders()
    };
    
    const response = await fetch(baseUrl + url, requestOption);
    return handleResponse(response);
}

async function put(url: string, body: unknown) {
    const requestOption = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };

    const response = await fetch(baseUrl + url, requestOption);
    return handleResponse(response);
}

async function post(url: string, body: unknown) {
    const requestOption = {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    };

    const response = await fetch(baseUrl + url, requestOption);
    return handleResponse(response);
}

async function del(url: string) {
    const requestOption = {
        method: 'DELETE',
        headers: await getHeaders(),
    };

    const response = await fetch(baseUrl + url, requestOption);
    return handleResponse(response);
}

async function handleResponse(response: Response) {
    const text = await response.text();
    const data = text && JSON.parse(text);
    if (response.ok) {
        return data || response.statusText;
    } else {
        const error = {
            status: response.status,
            message: response.statusText
        }
        
        return {error};
    }
}

export const fetchWrapper = {
    get, put, post, del
}
