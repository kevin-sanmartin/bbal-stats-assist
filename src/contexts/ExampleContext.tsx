import { createContext, useCallback, useContext, useEffect, useState } from "react";

type IExampleContext = {
    value: number;
    increment: () => void;
};

type IProps = {
    children: React.ReactNode;
};

const ExampleContext = createContext<IExampleContext>(undefined!);

export function ExampleProvider(props: IProps) {
    const { value, increment } = useExample();

    return <ExampleContext.Provider value={{ value, increment }}>{props.children}</ExampleContext.Provider>;
}

const useExample = () => {
    const [value, setValue] = useState(0);

    const increment = useCallback(() => {
        setValue((prev) => prev + 1);
    }, []);

    useEffect(() => {
        console.log("Value changed:", value);
    }, [value]);

    return { value, increment };
};

export const useExampleContext = () => {
    const context = useContext(ExampleContext);
    if (!context) {
        throw new Error("useExampleContext must be used within an ExampleProvider");
    }
    return context;
};
