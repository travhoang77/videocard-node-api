const { array } = require("joi");
const _ = require("lodash");

function updateObject(oldObj, newObj) {
  let keys = Object.keys(newObj);

  keys.map((x) => {
    oldObj[x] = newObj[x];
  });

  return oldObj;
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function moveItemToFront(prop, value, data) {
  data.sort(function (x, y) {
    return x[prop] == value ? -1 : y[prop] == data ? 1 : 0;
  });
}

function omitPassword(user) {
  user = _.pick(user, [
    "email",
    "firstname",
    "lastname",
    "date",
    "access_tokens",
    "birth_year",
    "addresses",
    "_id",
    "__v",
  ]);
  return user;
}

module.exports = {
  removeItemOnce,
  omitPassword,
  updateObject,
  moveItemToFront,
};
