import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

const DetailData = () => {
  const router = useRouter();
  const [detailData, setDetailData] = useState<any>({
    name: "",
    email: "",
    address: "",
  });
  const [originalData, setOriginalData] = useState<any>({});
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getData = async () => {
    const response = await fetch(
      "https://695895df6c3282d9f1d54f77.mockapi.io/articles/" + router.query.id
    );
    const data = await response.json();
    setDetailData(data);
    setOriginalData(data);
    console.log("fetch data", data);
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (localStorage.getItem("loginToken") !== null) {
      getData();
    } else {
      router.push("/dashboard/login");
    }
    console.log(localStorage.getItem("loginToken"));
  }, [router]);

  useEffect(() => {
    console.log(router);
  }, [router]);

  const handleChange = (e: any) => {
    if (e.target.value === "") {
      setErrorMessage(`${e.target.name} tidak boleh kosong`);
      setButtonStatus(true);
    } else {
      setErrorMessage(``);
      setButtonStatus(false);
    }
    setDetailData({
      ...detailData,
      [e.target.name]: e.target.value,
    });
  };

  const updateData = async (e: any) => {
    console.log("EVEnt", e.target);
    e.preventDefault();
    const formData = new FormData(e.target);
    const datas = Object.fromEntries(formData);

    console.log("data", datas);
    setButtonStatus(true);
    const response = await fetch(
      "https://695895df6c3282d9f1d54f77.mockapi.io/articles/" + router.query.id,
      {
        method: "PUT",
        body: JSON.stringify(datas),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    console.log("AAA", detailData);
    if (!data.error) {
      getData();
      setTimeout(() => {
        setButtonStatus(false);
      }, 1000);
    }
    console.log("update", data);
  };

  useEffect(() => {
    if (JSON.stringify(originalData) === JSON.stringify(detailData)) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }, [detailData]);
  const { pending } = useFormStatus();

  return (
    <div className="bg-black text-white h-screen]">
      <div className="max-w-100 mx-auto">
        {originalData ? (
          <li
            key={originalData.email}
            className="flex justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={originalData.avatar}
                className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-white">
                  {originalData.name}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-400">
                  {originalData.email}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-400">
                  {originalData.address}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <div>
                <p
                  className={`text-sm/6 text-white px-2 ${
                    originalData.followers > 500
                      ? "bg-blue-700 rounded"
                      : "bg-red-700 rounded"
                  }`}
                >
                  {originalData.followers}
                </p>
              </div>
              {!originalData.status ? (
                <p className="mt-1 text-xs/5 text-gray-400">
                  <span>Offline</span>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/30 p-1">
                    <div className="size-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs/5 text-gray-400">Online</p>
                </div>
              )}
            </div>
          </li>
        ) : (
          <div className="text-white mx-auto max-w-fit">Loading...</div>
        )}
      </div>
      <div className="container mx-auto">
        <form method="POST" onSubmit={updateData}>
          <div className="w-100 mx-auto">
            <div className="mb-4">
              <label htmlFor={"name"}>Name</label>
              <br />
              <input
                name="name"
                type="text"
                value={detailData.name}
                className="bg-white border border-blue-200 rounded text-black px-2 py-1 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor={"email"}>Email</label>
              <br />
              <input
                name="email"
                type="text"
                value={detailData.email}
                className="bg-white border border-blue-200 rounded text-black px-2 py-1 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor={"address"}>Address</label>
              <br />
              <textarea
                name="address"
                value={detailData.address}
                className="bg-white border border-blue-200 rounded text-black px-2 py-1 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              {errorMessage !== "" && (
                <div className="text-red-400 text-right mb-2 capitalize">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={buttonStatus}
                // onClick={() => updateData()}
                className="disabled:opacity-20 bg-blue-600 rounded px-2 py-1 float-right hover:opacity-80 cursor-pointer"
              >
                {pending ? "loading..." : "update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailData;
