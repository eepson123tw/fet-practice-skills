import type { Link } from "../types/link";
import {
  canvasGroups,
  browserApiGroups,
  GroupValue,
  Group,
  cssGroups,
  jsGroups,
} from "../types/link";

export const links: Link[] = [
  ...canvasGroups,
  ...browserApiGroups,
  ...cssGroups,
  ...jsGroups,
];

export function isValidKey(key: string): key is GroupValue {
  return Object.values(Group).some((enumValue) => enumValue === key);
}

export const groupBy = (arr: Link[], key: keyof Link) => {
  return arr.reduce((acc, cur) => {
    const groupKey = cur[key];
    if (isValidKey(groupKey)) {
      (acc[groupKey] = acc[groupKey] || []).push(cur);
      acc[groupKey].sort((a, b) => a.routeName.localeCompare(b.routeName));
    }
    return acc;
  }, {} as Record<GroupValue, Link[]>);
};
