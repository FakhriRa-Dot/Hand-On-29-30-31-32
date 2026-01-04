import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const router = useRouter();
  const [usersList, setUsersList] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUsersList(data);
    console.log("fetch data", data);
  };

  return (
    <div>
      <div className="container mx-auto">
        <table className="table-auto bg-gray-900/50 border w-full">
          <thead>
            <tr className="text-left ">
              <th className="px-3">Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {usersList.map((user: any) => {
              return (
                <tr className="odd:bg-white even:bg-gray-200 border p-3 ">
                  <td className="px-3 py-2">{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <div
                      onClick={() => router.push(`users/${user.id}`)}
                      className="cursor-pointer bg-blue-800 text-white px-2 py-1 rounded max-w-fit "
                    >
                      Detail Profile
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
