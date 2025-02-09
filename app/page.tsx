import { Suspense } from "react";

import { getData } from "./actions";

import MainPage from "@/components/main-page";
import LoadingSkeleton from "@/components/loading-skeleton";

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
