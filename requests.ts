export async function send(path:string, body:any, provided_token?:string) {
    let token;
    for (let x of document.cookie.split(';')) {
        if (x.includes('token_active=')) {
            token = x.split('=')[1];
            break;
        }
    }
    try {
        let request = await fetch(`https://internal.blocklycode.org/${path}`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Allow': 'application/json',
                'Authorization': provided_token ?? token ?? "",
            },
            body: JSON.stringify(body)
        });
        let data;
        if (request.ok) {
            data = await request.json();
        } else {
            data = await request.text();
        }
        return {status: request.status, data}
    } catch (e) {
        return {status: 500, data: e}
    }
}

export async function upload(file:string, name:string, path:string) {
    try {
        let request = await fetch(`https://cdn.blocklycode.org/upload`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Allow': 'application/json',
            },
            body: JSON.stringify({path, name, file})
        });
        if (request.ok) {
            let data = await request.json();
            return {status: 200, url: data.url}
        } else {
            let data = await request.text();
            return {status: request.status, data}
        }
    } catch (e) {
        return {status: 500, data: e}
    }
}
export async function listfiles(folder:string) {
    try {
        let request = await fetch(`https://cdn.blocklycode.org/list`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Allow': 'application/json',
            },
            body: JSON.stringify({folder})
        });
        if (request.ok) {
            let data = await request.json();
            return {status: 200, data}
        } else {
            let data = await request.text();
            return {status: request.status, data}
        }
    } catch (e) {
        return {status: 500, data: e}
    }
}