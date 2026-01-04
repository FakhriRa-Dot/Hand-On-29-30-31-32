import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    console.log("type", typeof window);

    if (localStorage.getIte("loginToken") !== null) {
      setToken(localStorage.getItem("loginToken"));
      console.log("in");
      setLoginStatus(true);
    } else {
      console.log("out");
      setLoginStatus(false);
    }
    console.log("login", localStorage.getItem("loginToken"));
  }, [token]);

  return (
    <div className="flex flex-row justify-between bg-white">
      <div className="flex logo"></div>
      <div className="flex flex-row  text-black items-center">
        <div className="cursor-pointer hover:bg-black hover:text-white h-full content-center px-7 transition duration-150 ease-in-out">
          <Link href="/">Home</Link>
        </div>
        <div
          onClick={() => redirect("/news")}
          className="cursor-pointer hover:bg-black hover:text-white h-full content-center px-7 transition duration-150 ease-in-out"
        >
          <Link href="/news">News</Link>
        </div>
        <div className="cursor-pointer hover:bg-black hover:text-white h-full content-center px-7 transition duration-150 ease-in-out">
          <a href="/dashboard/home">Users</a>
        </div>
        <div className="cursor-pointer hover:bg-black hover:text-white h-full content-center px-7 transition duration-150 ease-in-out">
          <a href="/promo">Promo</a>
        </div>
      </div>
      <div className="flex icon">
        <span className=" font-bold">
          <a href="/user/register">Register</a>
        </span>
      </div>
    </div>
  );
};
