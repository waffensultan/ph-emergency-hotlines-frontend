"use server";

export async function getData(url: string) {
    const response = await fetch(url);
    const data = await response.json();

    return data.data;
}
