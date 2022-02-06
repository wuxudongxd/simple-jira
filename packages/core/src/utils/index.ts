/**
 * 去除对象上值为undefined、null、"" 的键值对
 */
export const cleanObject = (object?: { [key in string]: unknown }) => {
  if (!object) return {};
  return Object.fromEntries(
    Object.entries(object).filter(
      ([_, value]) => ![undefined, null, ""].includes(value as any)
    )
  );
};

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 重置路由
 */
export const resetRoute = () => (window.location.href = window.location.origin);
