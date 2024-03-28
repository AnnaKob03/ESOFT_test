function deepCopy(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (seen.has(obj)) {
      return seen.get(obj);
  }

  let newObj;

  if (obj instanceof Date) {
      newObj = new Date(obj);
  } else if (obj instanceof Map) {
      newObj = new Map(Array.from(obj, ([key, val]) => [key, deepCopy(val, seen)]));
  } else if (obj instanceof Set) {
      newObj = new Set(Array.from(obj, item => deepCopy(item, seen)));
  } else if (Array.isArray(obj)) {
      newObj = [];
      seen.set(obj, newObj);
      obj.forEach((item, index) => {
          newObj[index] = deepCopy(item, seen);
      });
  } else {
      newObj = Object.create(Object.getPrototypeOf(obj));
      seen.set(obj, newObj);
      for (let key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
              newObj[key] = deepCopy(obj[key], seen);
          }
      }
  }

  return newObj;
}

// пример использования
const obj = {
  a: 1,
  b: {
      c: 2,
      d: [3, 4],
      e: new Set([5, 6])
  },
  f: new Date()
};

const copiedObj = deepCopy(obj);
console.log(copiedObj);