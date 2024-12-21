import React, { useEffect, useState } from "react"
export const DateTell = () => {
    const [dte, setDte] = useState(null);
    const [mnt, setMnt] = useState("");
    const [day, setDay] = useState("");
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    useEffect(() => {
        const d = new Date();
        setDte(d.getDate());
        setMnt(months[d.getMonth()]);
        setDay(days[d.getDay()]);
    }, [])
    
    return (
        <div>
            <span>
                {`${day}, ${String(dte).padStart(2, "0")} ${mnt} `}
            </span>
        </div>
    );
}