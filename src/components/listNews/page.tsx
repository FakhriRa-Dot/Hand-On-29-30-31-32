import { NewsContext } from "@/context/newsContext";
import { useContext, useEffect } from "react";

const ListNews = () => {
  const { getData, postList } = useContext<any>(NewsContext);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {postList.map((post: any) => {
        return (
          <div className="bg-gray-100 mb-5">
            <div>{post.title}</div>
            <div>{post.body}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ListNews;
