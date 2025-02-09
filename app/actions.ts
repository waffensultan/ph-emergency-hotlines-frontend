"use server";

export async function getData(url: string) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error("Failed to fetch emergency hotlines: ", error);
        return { error: "Unable to fetch data at this time." };
    }
}
