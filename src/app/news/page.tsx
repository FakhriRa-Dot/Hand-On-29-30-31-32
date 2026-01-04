import { CounterContext } from "@/context/counterContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const NewsPage = () => {
  const router = useRouter();
  const { count } = useContext<any>(CounterContext);
  const [postList, setPostList] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPostList(data);
    console.log("fetch data", data);
  };

  return (
    <div>
      {count}
      <div className="container mx-auto">
        {postList.map((post: any) => {
          return (
            <div
              className="bg-gray-100 mb-5"
              onClick={() => router.push(`news/detail/${post.id}`)}
            >
              <div>{post.title}</div>
              <div>{post.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsPage;
