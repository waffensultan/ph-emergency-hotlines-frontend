import MainPage from "@/components/main-page";

import { getData } from "./actions";

export default async function Page() {
    const initialData = await getData(
        "https://ph-emergency-hotlines-api.onrender.com/api/"
    );

    return <MainPage initialData={initialData} />;
}
