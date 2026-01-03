import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashboardHome = () => {
  const router = useRouter();
  const [userList, setUserlist] = useState<any>([]);
  const getData = async () => {
    const response = await fetch(
      "https://695895df6c3282d9f1d54f77.mockapi.io/articles"
    );
    const data = await response.json();
    setUserlist(data);
    console.log("fetch data", data);
  };
  useEffect(() => {
    if (localStorage.getItem("loginToken") !== null) {
      getData();
    } else {
      router.push("/dashboard/login");
    }
    console.log(localStorage.getItem("loginToken"));
  }, []);
  const doLogout = () => {
    localStorage.removeItem("loginToken");
    setTimeout(() => {
      router.push("/dashboard/login");
    }, 500);
  };
  return (
    <div className="bg-black">
      <div
        onClick={() => {
          doLogout();
        }}
        className="text-white float-right bg-red-800 px-2 py-1 rounded cursor-pointer mx-4 my-4 hover:opacity-90"
      >
        Logout
      </div>
      <div className="max-w-100 mx-auto">
        <div className="bg-black">
          <ul role="list" className="divide-y divide-white/5">
            {userList.map((user: any) => (
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
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-white">{user.role}</p>
                  {user.lastSeen ? (
                    <p className="mt-1 text-xs/5 text-gray-400">
                      Last seen{" "}
                      <time dateTime={user.lastSeenDateTime}>
                        {user.lastSeen}
                      </time>
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
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
