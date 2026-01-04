import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailPost = () => {
  const router = useRouter();
  const [detail, setDetail] = useState<any>({});
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    if (!router.isReady) return;

    console.log("id:", router.query.id);
    getData(router.query.id);
    getDataComment(router.query.id);
  }, [router.isReady]);

  const getData = async (id: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = await response.json();
    setDetail(data);
    console.log("fetch data", data);
  };

  const getDataComment = async (id: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    const data = await response.json();
    setComments(data);
    console.log("fetch data", data);
  };

  return (
    <div className="container mx-auto">
      <div className="">
        <div className="font-bold">{detail.title}</div>
        <div>{detail.body}</div>
      </div>
      <div>
        <div className="mb-10">Comments</div>
        <div>
          {comments.map((comment: any, index: number) => {
            return (
              <>
                <div className="mb-5 text-sm bg-gray-100 p-4 rounded-xl ">
                  <span className="font-bold">{index + 1}</span>
                  <span className="font-bold"> {comment.name}</span> -- by{" "}
                  <span className="italic text-gray-500">{comment.email}</span>
                  <div>{comment.body}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
