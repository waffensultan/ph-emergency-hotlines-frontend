import { Suspense } from "react";
import MainPage from "@/components/main-page";

import { getData } from "./actions";

export default function Page() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <MainPageWrapper />
        </Suspense>
    );
}

async function MainPageWrapper() {
    const initialData = await getData(
        "https://ph-emergency-hotlines-api.onrender.com/api/"
    );

    return <MainPage initialData={initialData} />;
}

function LoadingSkeleton() {
    return <div>Loading...</div>;
}
