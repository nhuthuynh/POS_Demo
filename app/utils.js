function getBodyRequest(method: string, params: Object):Object {
    const bodyRequest = {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'jsonrpc': '2.0',
                    'method': 'call',
                    params
                })
        }

    return bodyRequest
}

export async function callAPI(url:string, method: string, params: Object): Promise {
    return await fetch(url, getBodyRequest(method, params)).then((response) => response.json()).then((res)=>{
        if(res.error || res.result.error) {
            throw new Error((res.error && res.error.message) || (res.result.error));
        } else {
            return res.result;
        }
    })
}
