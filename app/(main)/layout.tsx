import type { Metadata } from "next";

import MainPage from "./page"

import { Suspense } from "react"

export const metadata: Metadata = {
  title: "PH Emergency Hotlines API",
  description: "Documentation for PH Emergency Hotlines API developed by waffensultan.",
};

export default function MainLayout() {
    return (
        <Suspense fallback={ <div>Loading...</div> }>
            <MainPageLoader />
        </Suspense>
    )
}

async function MainPageLoader() {
    const response = await fetch('https://ph-emergency-hotlines-api.onrender.com/api');
    const data = await response.json();

    return (
        <MainPage data={data.data} />
    )
}