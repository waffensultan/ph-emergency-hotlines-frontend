export function buildEmergencyHotlineURL(params?: {
    region?: string;
    province?: string;
    cityMunicipality?: string;
    hotline?: string;
}) {
    const url = new URL("https://ph-emergency-hotlines-api.onrender.com/api/");

    if (params?.region) {
        url.pathname += `${params.region}/`;
        if (params?.province) {
            url.pathname += `${params.province}/`;
            if (params?.cityMunicipality) {
                url.pathname += `${params.cityMunicipality}`;
                if (params?.hotline) {
                    url.searchParams.append("hotline", params.hotline);
                }
            }
        }
    }

    return url;
}
