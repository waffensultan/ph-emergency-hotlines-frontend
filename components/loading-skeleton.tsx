"use client";

import { useState, useEffect } from "react";

export default function LoadingSkeleton() {
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);

        // Refresh page after 1 minute (60 seconds)
        const timeout = setTimeout(() => {
            window.location.reload();
        }, 60000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div>
            <p>Loading...</p>
            {timeElapsed > 30 && (
                <p>Still loading... Try refreshing manually.</p>
            )}
        </div>
    );
}
