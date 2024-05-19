"use client";

import { use } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

const useBeta = () => {
  const users = use(fetchUsers());

  return (
    <ul>
      {users.map((user: User) => (
        <div key={user.id} className="bg-blue-50 p-2 my-4 rounded-lg">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </ul>
  );
};

export default { useBeta };
