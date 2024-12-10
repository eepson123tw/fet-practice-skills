# TS

## TS default Utility Types

```ts
Partial<T>; // 成員變為可選

Required<T>; // 成員變為必填

ReadOnly<T>; // 成員變為只讀

Exclude<T, U>; // 從 T 中 剔除可以賦值給Ｕ的類型

Extract<T, U>; // 提取 T 中可以賦值給Ｕ的類型

NoNullable<T>; // 從 T 中 剔除 null 和 undefined

ReturnType<T>; // 獲取函數返回值類型

InstanceType<T>; // 獲取構造函數實例
```

## TS 協變和逆變

類型安全保證
-> 所有成員可用
-> 判定誰在給誰在收

給:超集 子類型 Fans 成員多
收:子集 父類型 Aaron 成員少

```ts
interface Fans {
  call(): void;
}

interface Aaron extends Fans {
  dance(): void;
  sing(): void;
  baseketball(): void;
}

let fans: Fans = {};
let aaron: Aaron = {};

fans = aaron; // 保證之後調用父類型時所有成員可用

interface SuperAaron extends Aaron {
  fly(): void;
}

const superAaron: SuperAaron = {
  call: () => {},
  dance: () => {},
  sing: () => {},
  baseketball: () => {},
  fly: () => {},
};
const fans: Fans = {
  call: () => {},
};

type Transform = (x: Aaron) => Aaron;
type SuperTransform = (x: Fans) => Fans;
```

https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyxyIcAthAFzIZhSgDmA3ESXI9aQK7kBG0VgF9kBAqEixEKAOLc4IRvjbEylGnQaLWJZBy4heAqDpIALLHz7AIGDfSYBtALoEhYgDYQwyAA5awAAlLa1saAApGeUUaOQVGAEpkAF4APmQANyxgABNWAn8JYKsbDBTkSOjElPTCXQQcbC8AOg8sRkr45osS2wThT28-AIA5Ci5w30wcGnQobBAktMzsvLFC8DHKcsnpxZrlesasFraOqfmcZrUIfrcxMTAATynkAFUQYBwAJgBJcEwEAQYC+IAAPG90skKm9kBAAB6QEA5MoKJ7IAD8FXhNDeS3SaOQNBAEAy0CSCKRKIqbBxyFAMGgyF+BHxehATzYWJZxGJpMED2erzg5Q+oL+APmQJBODB+DgVAA5HBFSIAD54PhKviq1IPcSS+BIZAAMQUZTqyAQcA8HnCCRoWVyAwNkiNKAAgnAoDg4YiIMiymaQBa2DkFEh7Y7VqYMEwoytnWw+HAMBAANbeFO2hNOtbuV3Qd3IADK3AuXp9uEpAepld9lpgHieuZj9wIDRDPgw5eg9ZANDLFe9vuhluttoibLwQgANGGIxNp3O2HGYhVl-PiCm05mwNmPFODjOt8gm08j8sT25WJ26GfzTRg2Ux2wJ4eN8eV0J8kKUAAVKBzRgLAoHIHY6X7Nl+1YP9S17KBAOA0DwOhcI6WfNln3yO9uwQpCQxAsCqCHaACIwIjUOxBI0ktKBvG4KBcHhPRUQ5dtcOQehkLAk0B3Iyjyh7C4BJQsROL0aEuKAwiUL4+0gA
