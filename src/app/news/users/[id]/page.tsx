import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailUsers = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [albums, setAlbums] = useState<any>([]);
  const [photos, setPhotos] = useState<any>([]);

  useEffect(() => {
    if (!router.isReady) return;

    console.log("id:", router.query.id);
    getData(router.query.id);
    getAlbums(router.query.id);
  }, [router.isReady]);

  const getData = async (id: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = await response.json();
    setUser(data);
    console.log("fetch data", data);
  };
  const getAlbums = async (id: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}/albums`
    );
    const data = await response.json();
    setAlbums(data);
    console.log("fetch data", data);
  };
  const getPhotos = async (id: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${id}/photos`
    );
    const data = await response.json();
    setPhotos(data);
    console.log("fetch data", data);
  };

  return (
    <div className="container mx-auto">
      <div className="bg-black text-white max-w-fit p-3 rounded">
        <div className="font-bold">{user.name}</div>
        <div>{user.email}</div>
      </div>
      <div>
        <div className="mb-5 mt-10">Albums</div>
        <div>
          {albums.map((album: any, index: number) => {
            return (
              <>
                <div
                  className="mb-5 text-sm bg-gray-100 p-4 rounded-xl cursor-pointer"
                  onClick={() => {
                    getPhotos(album.id);
                  }}
                >
                  <span className="font-bold">{index + 1}.</span>
                  <span className="font-bold">{album.title}</span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
