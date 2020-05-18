import format from 'date-fns/format';

// eslint-disable-next-line no-extend-native
Array.prototype.unique = function() {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

export const groupBy = (objectArray, property) => {
  try {
    return objectArray.reduce(function(total, obj) {
      let key = obj[property];
      if (!total[key]) {
        total[key] = [];
      }
      total[key].push(obj);
      return total;
    }, {});
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const formatDate = dateString => {
  const dateObject = new Date(Date.parse(dateString));
  return format(dateObject, 'dd/MM/yyyy');
};
