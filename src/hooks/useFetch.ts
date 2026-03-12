import { normalizeSheetData } from '@/utils/normalizeSheetData';
import { useEffect, useState, useCallback } from 'react';

export function useFetch<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!url) return;
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            const resData: T = await res.json();
            setData(resData);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
