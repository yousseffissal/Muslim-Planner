import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL

export const QuranHook = () => {
    const { t } = useTranslation('adhan');
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const fetchQuranSurah = async (number, selectedReader) => {
        try {
            setLoading(true);
            setError('')
            setResult(null)

            const response = await axios.get(
                `${API_URL}/Quran/quranSurah/${number}/${selectedReader}`
            )
            setResult(response.data)

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
        result,
        error,
        setResult,
        fetchQuranSurah
    }

}
