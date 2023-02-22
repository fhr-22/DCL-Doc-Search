import { useEffect, useState } from "react";

const StatusBadge = ({ text, color }) => {
    const [extraClass, setExtraClass] = useState('')

    // Add and remove CSS class for update effect whenever text changes
    useEffect(() => {
        setExtraClass('animate-update');
        setTimeout(() => {
            setExtraClass('');
        }, 400);
    }, [text])

    return (
        <div className={"statusbox " + extraClass} style={{ "backgroundColor": color }}>{text}</div>
    )
}
export default StatusBadge;