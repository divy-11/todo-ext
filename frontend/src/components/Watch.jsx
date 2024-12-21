import React, { useEffect, useState } from "react"
export const Watch = () => {
    const [hr, setHr] = useState(null);
    const [min, setMin] = useState(null);
    const [sec, setSec] = useState(null);
    useEffect(() => {
        let intervalId = setInterval(() => {
            const d = new Date();
            setHr(d.getHours());
            setMin(d.getMinutes());
            setSec(d.getSeconds());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div>
            <span>
                {String(hr).padStart(2, "0")}:{String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
            </span>
        </div>
    );
}