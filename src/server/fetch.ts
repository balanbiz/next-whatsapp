export async function getResourse(url: RequestInfo | URL): Promise<any> {
    const response: Response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Could not get ${url}, status ${response.status}`);
    } else {
        console.log(`Authorization request sent ${url}`);
    }

    return await response.json();
}
export async function postResourse<Data>(url: RequestInfo | URL, data: Data): Promise<any> {
    const response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Could not put ${url}, status ${response.status}`);
    } else {
        console.log(data, "sent");
    }

    return await response.json();
}

export async function deleteResourse(url: RequestInfo | URL, id: number): Promise<any> {
    await fetch(`${url}/${id}`, {
        method: "DELETE",
    });
    console.log(id, "Удален с сервера");
}
