import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL

export const AdhanHook = () => {
    const [city, setCity] = useState("")
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [date, setDate] = useState("");
    const { t } = useTranslation('adhan');

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, []);

    const formattedDate = date.split("-").reverse().join("-");

    const fetchAdhan = async () => {
        try {
            setLoading(true);
            setError('')
            setResult(null)

            if (!city.trim()) {
                setError(t("adhan.errors.no_city"));
                setLoading(false);
                return;
            }

            const response = await axios.get(
                `${API_URL}/AdhanTime/AdhanInMyCity/${city}/${formattedDate}`
            )
            setResult(response.data)
            setSuccessMsg(t("adhan.messages.success", { city, date: formattedDate }));

        } catch (err) {
            setError(
                err.response?.data?.error || t("adhan.errors.default")
            )
        } finally {
            setLoading(false);
        }

    }

    return {
        loading,
        successMsg,
        city,
        result,
        error,
        date,
        setDate,
        setCity,
        fetchAdhan,
        setError,
        setSuccessMsg
    }

}
