# TS default Utility Types

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
