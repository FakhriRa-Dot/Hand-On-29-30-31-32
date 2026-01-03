// CounterProvider.jsx
import { useState } from "react";
import { CounterContext } from "./counterContext";
import { NewsContext } from "./newsContext";

export default function CounterProvider({ children }: any) {
  const [count, setCount] = useState(0);
  const [postList, setPostList] = useState<any>([]);
  const useRupiahConverter = (number: number) => {
    return `Rp.${number * 1000}`;
  };
  const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPostList(data);
    console.log("fetch data", data);
  };
  return (
    <CounterContext.Provider
      value={{ count, setCount, useRupiahConverter } as any}
    >
      <NewsContext.Provider value={{ postList, getData } as any}>
        {children}
      </NewsContext.Provider>
    </CounterContext.Provider>
  );
}
