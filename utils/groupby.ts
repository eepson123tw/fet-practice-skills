interface Friend {
  name: string;
  value: number;
  age: number;
  sex: string;
}

const friends: Friend[] = [
  { name: "allen", value: 1, age: 20, sex: "男" },
  { name: "bob", value: 2, age: 21, sex: "女" },
  { name: "charlie", value: 3, age: 22, sex: "男" },
  { name: "david", value: 4, age: 23, sex: "男" },
  { name: "emma", value: 5, age: 24, sex: "女" },
  { name: "frank", value: 6, age: 25, sex: "男" },
  { name: "grace", value: 7, age: 26, sex: "女" },
];

interface Friend {
  name: string;
  value: number;
  age: number;
  sex: string;
  [key: string]: any; // Add index signature
}

/**
 * Group by a callback function
 * @param array
 * @param cb
 * @returns
 */

const groupBy = (
  array: Friend[],
  cb: (u: Friend) => string
): { [key: string]: number } => {
  const result: { [key: string]: number } = {};
  for (let u of array) {
    const key = cb(u);
    if (!result[key]) {
      result[key] = 1;
    } else {
      result[key]++;
    }
  }
  return result;
};

console.log(groupBy(friends, (u: Friend) => (u.sex === "男" ? "男" : "女")));
