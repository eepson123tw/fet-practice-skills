/* eslint-disable @typescript-eslint/no-unused-vars */

import { consoleStyle } from "../utils/console";

enum Permission {
  Read = 0, // 0000
  Write = 2, // 0010
  Create = 4, // 0100
  Delete = 8, // 1000
}

// combine Permission
type PermissionType =
  | Permission.Read
  | Permission.Write
  | Permission.Create
  | Permission.Delete;

// or type
// 0001 or
// 0010 or
// 0011

type ReadWritePermission = Permission.Read | Permission.Write;

let p = Permission.Read | Permission.Write;
// how to check if a permission has read permission
// & operator (and)
// 0010
// 0001
// 0000
function hasPermission(
  target: PermissionType,
  permission: PermissionType
): boolean {
  // check if the permission has the target permission
  return (permission & target) === permission;
}

console.log(
  "%c has ReadPermission",
  consoleStyle,
  hasPermission(p, Permission.Read)
);

// how to delete a permission
// ^ operator (xor)
// 0010
// 0010
// 0000
p = p ^ Permission.Write;

console.log(
  "%c has Write Permission",
  consoleStyle,
  hasPermission(p, Permission.Write)
);
