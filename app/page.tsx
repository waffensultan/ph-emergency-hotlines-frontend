'use client';

import { Raleway } from "next/font/google";

import { Fragment, useEffect, useState } from "react";

import { FaGithub as GithubIcon } from "react-icons/fa";
import { FaRegCopy as CopyIcon } from "react-icons/fa6";

/* FONTS */
const raleway = Raleway({ subsets: ['latin'] });

export default function MainPage() {
    const [data, setData] = useState<undefined | Record<any, any>>(undefined);

    // I know. You shouldn't be fetching data in Client Components.
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://ph-emergency-hotlines-api.onrender.com/api/');
            const data = await response.json();

            setData(data.data);
        }
        fetchData();
    }, [])

    const [selectedRegion, setSelectedRegion] = useState<undefined | string>(undefined);
    const [selectedProvince, setSelectedProvince] = useState<undefined | string>(undefined);
    const [selectedCityMunicipality, setSelectedCityMunicipality] = useState<undefined | string>(undefined);
    const [selectedHotline, setSelectedHotline] = useState<undefined | string>(undefined);

    const [responseData, setResponseData] = useState<undefined | any>(undefined);
    const [loading, setLoading] = useState(false);

    const regions = Object.keys(data ?? []);
    const provinces = (selectedRegion)
        ? Object.keys(data?.[selectedRegion])
        : [];
    const cities_municipalities = selectedRegion && selectedProvince
        ? Object.keys(data?.[selectedRegion]?.[selectedProvince])
        : [];
    const available_hotlines = selectedRegion && selectedProvince && selectedCityMunicipality
        ? Object.keys(data?.[selectedRegion]?.[selectedProvince]?.[selectedCityMunicipality])
        : [];

    const url = new URL('https://ph-emergency-hotlines-api.onrender.com/');

    if (selectedRegion) {
        url.pathname += `api/${selectedRegion}/`
        if (selectedProvince) {
            url.pathname += `${selectedProvince}/`
            if (selectedCityMunicipality) {
                url.pathname += `${selectedCityMunicipality}`
                if (selectedHotline) {
                    url.searchParams.append('hotline', selectedHotline);
                }
            }
        }
    }

    const handleCopyClick = async () => {
        try {
            await window.navigator.clipboard.writeText(url.toString())
            alert("Copied to clipboard!");
        } catch (error) {
            console.error("Unable to copy to clipboard: ", error);
            alert("Copy to clipboard failed!");
        }
    }

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await fetch(url);
            const response_data = await response.json();

            setResponseData(response_data);
        } catch (error) {
            console.error("Ran into trouble fetching data, ", error);
            alert("Ran into trouble fetching data.");
        } finally {
            setLoading(false);
        }
    }

    // National should only have these fields:
    // national
    // hotline

    return (
        <main className="pb-10">
            <header className="w-full text-center flex flex-col gap-2 pt-12">
                <h1 className={`text-4xl md:text-7xl font-extrabold ${raleway.className}`}>
                    Philippines<br />Emergency Hotlines API
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
                            <span className="border-r-2 border-gray-700 pr-2">Github</span>
                            <span className="pl-1 text-sm text-gray-400">API</span>
                        </a>
                        <a 
                            href="https://github.com/waffensultan/ph-emergency-hotlines-frontend"
                            target="_blank"
                            className="self-start px-5 transition duration-150 shadow hover:shadow-md hover:border-white md:text-lg border border-gray-700  bg-gray-900 text-white rounded-md px-4 flex flex-row items-center gap-2"
                        >
                            <GithubIcon />
                            <span className="border-r-2 border-gray-700 pr-2">Github</span>
                            <span className="pl-1 text-sm text-gray-400">Frontend</span>
                        </a>
                    </div>
                    <div className="h-0.5 w-full bg-gray-700 rounded-full"></div>
                    <div className="flex flex-col justify-start gap-2">
                        <label 
                            htmlFor="region" 
                            className="font-semibold tracking-tight"
                        >Region</label>
                        <select 
                            id="region" 
                            className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
                            value={selectedRegion || "Choose a region"}
                            onChange={(event) => {
                                if ((selectedRegion !== undefined && event.target.value !== selectedRegion) || (!event.target.value)) {
                                    setSelectedProvince(undefined);
                                    setSelectedCityMunicipality(undefined);
                                    setSelectedHotline(undefined);
                                }
                                setSelectedRegion(event.target.value || undefined);
                            }}
                        >
                            <option value={""}>Choose a region</option>
                            {regions.map((region) => (
                                <option 
                                    key={region} 
                                    value={region}
                                >{region}</option>
                            ))}
                        </select>
                    </div>
                    {selectedRegion !== "national" && (
                        <Fragment>
                            <div className="flex flex-col justify-start gap-2">
                                <label 
                                    htmlFor="province"
                                    className="font-semibold tracking-tight"
                                >Province</label>
                                <select 
                                    id="province" 
                                    className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
                                    onChange={(event) => setSelectedProvince(event.target.value || undefined)}
                                >
                                    <option value={""}>Choose a province</option>
                                    {provinces.map((province) => (
                                        <option 
                                            key={province} 
                                            value={province}
                                        >{province}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col justify-start gap-2">
                                <label 
                                    htmlFor="city_municipality"
                                    className="font-semibold tracking-tight"
                                >City / Municipality</label>
                                <select 
                                    id="city_municipality" 
                                    className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
                                    value={selectedCityMunicipality || "Choose a city or municipality"}
                                    onChange={(event) => setSelectedCityMunicipality(event.target.value || undefined)}
                                >
                                    <option value={""}>Choose a city or municipality</option>
                                    {cities_municipalities.map((city_municipality) => (
                                        <option 
                                            key={city_municipality} 
                                            value={city_municipality}
                                        >{city_municipality}</option>
                                    ))}
                                </select>
                            </div>
                        </Fragment>
                    )}
                    <div className="flex flex-col justify-start gap-2">
                        <label 
                            htmlFor="hotline"
                            className="font-semibold tracking-tight"
                        >Hotline <span className="text-blue-400">(Optional)</span></label>
                        <select 
                            id="hotline" 
                            className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500"
                            value={selectedHotline || "Choose a hotline"}
                            onChange={(event) => setSelectedHotline(event.target.value || undefined)}
                        >
                            <option value={""}>Choose a hotline</option>
                            {available_hotlines.map((hotline) => (
                                <option 
                                    key={hotline} 
                                    value={hotline}
                                >{hotline}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full flex flex-row justify-start max-md:pt-10 md:justify-end items-center gap-3">
                        <button 
                            onClick={() => {
                                setSelectedRegion(undefined);
                                setSelectedProvince(undefined);
                                setSelectedCityMunicipality(undefined);
                                setSelectedHotline(undefined);
                                setResponseData(undefined);
                            }}
                            className="rounded-xl py-2 px-7 tracking-wide text-foreground transition duration-300 border border-background hover:border-white"
                        >Clear Fields</button>
                        <button 
                            disabled={loading}
                            onClick={() => handleSubmit()}
                            className="py-2 px-7 text-foreground bg-green-500 rounded-xl tracking-wide font-semibold transition duration-150 hover:bg-green-600 hover:text-white/60"
                        >GET</button>
                    </div>
                </div>

                <div
                    className="h-[35rem] max-h-full flex flex-col gap-5 overflow-x-auto overflow-y-auto bg-gray-900 border border-gray-800 text-foreground p-4 rounded-xl text-background max-md:text-xs md:w-2/3"
                >
                    <div className="text-white w-full rounded-full bg-gray-800 border border-gray-700 flex flex-row items-center justify-between gap-3">
                        <span className="py-1 px-4 border-r border-gray-700 text-green-500 font-semibold">GET</span>
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
                        <span className="text-gray-600 tracking-wider">{!responseData && "Your results will appear here..."}</span>
                        <pre>{responseData && JSON.stringify(responseData, null, 2)}</pre>
                    </div>
                </div>
            </section>
        </main>
    )
}
