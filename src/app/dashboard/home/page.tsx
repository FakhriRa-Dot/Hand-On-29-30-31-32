import ModalDialog from "@/components/modal/page";
import { useRouter } from "next/router";
import { useEffect, useState, useTransition } from "react";

const DashboardHome = () => {
  const router = useRouter();
  const [userList, setUserlist] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [searchText, setSearchText] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const getData = async (query?: string) => {
    const response = await fetch(
      "https://695895df6c3282d9f1d54f77.mockapi.io/articles?search=" + query
    );
    if (response.status == 404) {
      setUserlist([]);
      return;
    }
    const data = await response.json();
    console.log("response", response);
    console.log("data", data);
    setUserlist(data);
    console.log("fetch data", data);
  };

  useEffect(() => {
    if (localStorage.getItem("loginToken") !== null) {
      // @ts-ignore
      setCurrentUser(JSON.parse(localStorage.getItem("userData")));
    } else {
      router.push("/dashboard/login");
    }
  }, []);

  const doLogout = () => {
    localStorage.removeItem("loginToken");
    setTimeout(() => {
      router.push("/dashboard/login");
    }, 500);
  };

  const deleteData = async (id: any) => {
    const response = await fetch(
      "https://695895df6c3282d9f1d54f77.mockapi.io/articles/" + id,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (!data.error) {
      getData();
      setCurrentUser({});
      setTimeout(() => {
        setModalStatus(false);
      }, 1500);
    }
    console.log("delete", data);
  };
  useEffect(() => {
    if (searchText.length >= 3) {
      startTransition(() => {
        getData(searchText);
      });
    } else if (searchText === "") {
      startTransition(() => {
        getData(searchText);
      });
    }
  }, [searchText]);
  return (
    <div className="bg-black pt-10 h-screen">
      <div className="w-100 mx-auto bg-white rounded">
        <input
          className="w-full px-2 py-1 rounded"
          type="text"
          placeholder="Search user..."
          value={searchText}
          onChange={(e: any) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      <ModalDialog
        show={modalStatus}
        closeCallback={() => setModalStatus(false)}
        approveDelete={() => deleteData(selectedUser.id)}
        user={selectedUser}
      />
      <div
        onClick={() => {
          doLogout();
        }}
        className="text-white float-right bg-red-800 px-2 py-1 rounded cursor-pointer mx-4 my-4 hover:opacity-90"
      >
        Logout
      </div>
      {isPending ? (
        <div className="text-white text-center h-screen bg-black">
          Filtering...
        </div>
      ) : (
        <div className="bg-black max-w-150 mx-auto mt-10">
          <div className="bg-black  ">
            <ul
              role="list"
              className="divide-y divide-white/5 max-h-150 overflow-y-scroll"
            >
              {userList.length > 0 ? (
                userList.map((user: any) => (
                  <li
                    key={user.email}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        alt=""
                        src={user.avatar}
                        className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                      />
                      <div
                        className="min-w-0 flex-auto hover:opacity-90 cursor-pointer"
                        onClick={() => {
                          router.push("home/detail/" + user.id);
                        }}
                      >
                        <p className="text-sm/6 font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p
                        className={`text-sm/6 text-white px-2 ${
                          user.followers > 500
                            ? "bg-blue-700 rounded"
                            : "bg-red-700 rounded"
                        }`}
                      >
                        {user.followers}
                      </p>
                      {!user.status ? (
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
                      {currentUser.email === "george.bluth@reqres.in" && (
                        <button
                          onClick={() => {
                            // deleteData(user.id);
                            setSelectedUser(user);
                            setModalStatus(true);
                          }}
                          className="rounded text-xs px-2 py-1 bg-red-800 text-white cursor-pointer hover:opacity-90"
                        >
                          Delete User
                        </button>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-white">data not found...</div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
