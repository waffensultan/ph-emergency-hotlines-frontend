"use client";

import { Raleway } from "next/font/google";
import { FaGithub as GithubIcon } from "react-icons/fa";
import { FaRegCopy as CopyIcon } from "react-icons/fa6";

import { Fragment, useState } from "react";

import { getData } from "@/app/actions";
import { buildEmergencyHotlineURL } from "@/utils/build-emergency-hotline-url";

/* FONTS */
const raleway = Raleway({ subsets: ["latin"] });

export default function MainPage({
    initialData,
}: {
    initialData: Awaited<ReturnType<typeof getData>>;
}) {
    const [selectedLocationData, setSelectedLocationData] = useState<
        Record<string, string | undefined>
    >({
        region: undefined,
        province: undefined,
        cityMunicipality: undefined,
        hotline: undefined,
    });
    const [responseData, setResponseData] = useState<undefined | any>(
        undefined
    );
    const [loading, setLoading] = useState(false);

    const url = buildEmergencyHotlineURL({ ...selectedLocationData });
    const data = initialData;

    const regions = Object.keys(data ?? []);
    const provinces = selectedLocationData.region
        ? Object.keys(data?.[selectedLocationData.region])
        : [];
    const cities_municipalities =
        selectedLocationData.region && selectedLocationData.province
            ? Object.keys(
                  data?.[selectedLocationData.region]?.[
                      selectedLocationData.province
                  ]
              )
            : [];
    const available_hotlines =
        selectedLocationData.region &&
        selectedLocationData.province &&
        selectedLocationData.cityMunicipality
            ? Object.keys(
                  data?.[selectedLocationData.region]?.[
                      selectedLocationData.province
                  ]?.[selectedLocationData.cityMunicipality]
              )
            : [];

    const handleCopyClick = async () => {
        try {
            await window.navigator.clipboard.writeText(url.toString());
            alert("Copied to clipboard!");
        } catch (error) {
            console.error("Unable to copy to clipboard: ", error);
            alert("Copy to clipboard failed!");
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await getData(url.toString());

            setResponseData(response);
        } catch (error) {
            console.error("Ran into trouble fetching data, ", error);
            alert("Ran into trouble fetching data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="pb-10">
            <header className="w-full text-center flex flex-col gap-2 pt-12">
                <h1
                    className={`text-4xl md:text-7xl font-extrabold ${raleway.className}`}
                >
                    Philippines
                    <br />
                    Emergency Hotlines API
                </h1>
            </header>

            <section className="w-full flex flex-col pt-20 gap-7 md:gap-10 md:flex-row">
                <div className="w-full flex flex-wrap flex-row self-start gap-5 md:flex-col md:justify-center md:w-1/3 md:gap-5">
                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold text-4xl">Links</h1>
                        <a
                            href="https://github.com/waffensultan/ph-emergency-hotlines-api"
                            target="_blank"
                            className="self-start px-5 transition duration-150 shadow hover:shadow-md hover:border-white md:text-lg border border-gray-700  bg-gray-900 text-white rounded-md px-4 flex flex-row items-center gap-2"
                        >
                            <GithubIcon />
                            <span className="border-r-2 border-gray-700 pr-2">
                                Github
                            </span>
                            <span className="pl-1 text-sm text-gray-400">
                                API
                            </span>
                        </a>
                        <a
                            href="https://github.com/waffensultan/ph-emergency-hotlines-frontend"
                            target="_blank"
                            className="self-start px-5 transition duration-150 shadow hover:shadow-md hover:border-white md:text-lg border border-gray-700  bg-gray-900 text-white rounded-md px-4 flex flex-row items-center gap-2"
                        >
                            <GithubIcon />
                            <span className="border-r-2 border-gray-700 pr-2">
                                Github
                            </span>
                            <span className="pl-1 text-sm text-gray-400">
                                Frontend
                            </span>
                        </a>
                        <h1 className="font-bold text-3xl pt-3">Status</h1>
                        <div
                            className={`${
                                data ? "text-green-600" : "text-yellow-600"
                            } flex flex-row items-center gap-1 rounded-md bg-gray-900 border border-gray-700 font-semibold tracking-tight py-1 px-3 flex-grow self-start`}
                        >
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    data ? "bg-green-400" : "bg-yellow-500"
                                }`}
                            ></div>
                            <span>{data ? "Online" : "Inactive"}</span>
                        </div>
                        {!data && (
                            <p className="text-sm">
                                Render spins down free-tier APIs for inactivity
                                which may delay initial data retrieval by a
                                minute or more.
                            </p>
                        )}
                    </div>
                    <div className="h-0.5 w-full bg-gray-700 rounded-full"></div>
                    <div className="flex flex-col justify-start gap-2">
                        <label
                            htmlFor="region"
                            className="font-semibold tracking-tight"
                        >
                            Region
                        </label>
                        <select
                            id="region"
                            disabled={!data}
                            className={`${
                                !data && "cursor-not-allowed"
                            } px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500`}
                            value={
                                selectedLocationData.region || "Choose a region"
                            }
                            onChange={(event) => {
                                if (
                                    (selectedLocationData.region !==
                                        undefined &&
                                        event.target.value !==
                                            selectedLocationData.region) ||
                                    !event.target.value
                                ) {
                                    setSelectedLocationData((prev) => ({
                                        ...prev,
                                        province: undefined,
                                        cityMunicipality: undefined,
                                        hotline: undefined,
                                    }));
                                }

                                setSelectedLocationData((prev) => ({
                                    ...prev,
                                    region: event.target.value || undefined,
                                }));
                            }}
                        >
                            <option value={""}>Choose a region</option>
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedLocationData.region !== "national" && (
                        <Fragment>
                            <div className="flex flex-col justify-start gap-2">
                                <label
                                    htmlFor="province"
                                    className="font-semibold tracking-tight"
                                >
                                    Province
                                </label>
                                <select
                                    id="province"
                                    disabled={!data}
                                    className={`${
                                        !data && "cursor-not-allowed"
                                    } px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500`}
                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setSelectedLocationData((prev) => ({
                                                ...prev,
                                                province: undefined,
                                            }));
                                        } else {
                                            setSelectedLocationData((prev) => ({
                                                ...prev,
                                                province: event.target.value,
                                            }));
                                        }
                                    }}
                                >
                                    <option value={""}>
                                        Choose a province
                                    </option>
                                    {provinces.map((province) => (
                                        <option key={province} value={province}>
                                            {province}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col justify-start gap-2">
                                <label
                                    htmlFor="city_municipality"
                                    className="font-semibold tracking-tight"
                                >
                                    City / Municipality
                                </label>
                                <select
                                    id="city_municipality"
                                    disabled={!data}
                                    className={`${
                                        !data && "cursor-not-allowed"
                                    } px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500`}
                                    value={
                                        selectedLocationData.cityMunicipality ||
                                        "Choose a city or municipality"
                                    }
                                    onChange={(event) => {
                                        if (event.target.value) {
                                            setSelectedLocationData((prev) => ({
                                                ...prev,
                                                cityMunicipality:
                                                    event.target.value,
                                            }));
                                            if (
                                                event.target.value !==
                                                selectedLocationData.cityMunicipality
                                            ) {
                                                setSelectedLocationData(
                                                    (prev) => ({
                                                        ...prev,
                                                        hotline: undefined,
                                                    })
                                                );
                                            }
                                        } else {
                                            setSelectedLocationData((prev) => ({
                                                ...prev,
                                                cityMunicipality:
                                                    event.target.value,
                                            }));
                                        }
                                    }}
                                >
                                    <option value={""}>
                                        Choose a city or municipality
                                    </option>
                                    {cities_municipalities.map(
                                        (city_municipality) => (
                                            <option
                                                key={city_municipality}
                                                value={city_municipality}
                                            >
                                                {city_municipality}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </Fragment>
                    )}
                    <div className="flex flex-col justify-start gap-2">
                        <label
                            htmlFor="hotline"
                            className="font-semibold tracking-tight"
                        >
                            Hotline{" "}
                            <span className="text-blue-400">(Optional)</span>
                        </label>
                        <select
                            id="hotline"
                            disabled={!data}
                            className={`${
                                !data && "cursor-not-allowed"
                            } px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500`}
                            value={
                                selectedLocationData.hotline ||
                                "Choose a hotline"
                            }
                            onChange={(event) =>
                                setSelectedLocationData((prev) => ({
                                    ...prev,
                                    hotline: event.target.value || undefined,
                                }))
                            }
                        >
                            <option value={""}>Choose a hotline</option>
                            {available_hotlines.map((hotline) => (
                                <option key={hotline} value={hotline}>
                                    {hotline}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full flex flex-row justify-start max-md:pt-10 md:justify-end items-center gap-3">
                        <button
                            onClick={() => {
                                setSelectedLocationData(() => ({
                                    region: undefined,
                                    province: undefined,
                                    cityMunicipality: undefined,
                                    hotline: undefined,
                                }));
                                setResponseData(undefined);
                            }}
                            className="rounded-xl py-2 px-7 tracking-wide text-foreground transition duration-300 border border-background hover:border-white"
                        >
                            Clear Fields
                        </button>
                        <button
                            disabled={loading || !data}
                            onClick={() => handleSubmit()}
                            className={`${
                                !data
                                    ? "cursor-not-allowed bg-green-600 text-white text-white/60"
                                    : "hover:bg-green-600 hover:text-white/60"
                            } py-2 px-7 text-foreground bg-green-500 rounded-xl tracking-wide font-semibold transition duration-150`}
                        >
                            GET
                        </button>
                    </div>
                </div>

                <div className="h-[35rem] md:h-auto max-h-screen flex flex-col gap-5 overflow-x-auto overflow-y-auto bg-gray-900 border border-gray-800 text-foreground p-4 rounded-xl text-background max-md:text-xs md:w-2/3">
                    <div className="text-white w-full rounded-full bg-gray-800 border border-gray-700 flex flex-row items-center justify-between gap-3">
                        <span className="py-1 px-4 border-r border-gray-700 text-green-500 font-semibold">
                            GET
                        </span>
                        <input
                            disabled
                            value={url.toString()}
                            className="w-full bg-transparent"
                        />
                        <button
                            onClick={() => handleCopyClick()}
                            className="py-1 px-4 border-l border-gray-700 flex flex-row items-center gap-2"
                        >
                            <CopyIcon />
                            <span>Copy</span>
                        </button>
                    </div>
                    <div className="w-full flex overflow-x-auto text-white">
                        <span className="text-gray-600 tracking-wider">
                            {!responseData &&
                                "Your results will appear here..."}
                        </span>
                        <pre>
                            {responseData &&
                                JSON.stringify(responseData, null, 2)}
                        </pre>
                    </div>
                </div>
            </section>
        </main>
    );
}
