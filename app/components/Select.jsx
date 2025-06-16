"use client";

import { useEffect, useState } from "react";
import Select from "react-select";

export default function ClientOnlySelect({
    value,
    onChange,
    options,
    placeholder,
    isMulti = false,
    name,
}) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <Select
            name={name}
            value={value}
            onChange={onChange}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder}
        />
    );
}
