function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkRoute(route, checkFirst = true) {
  const checkPos = checkFirst ? 0 : route.length - 1;
  if (typeof route !== 'string') {
    throw new Error('route should be string');
  }
  if (checkFirst) {
    if (route[checkPos] !== '/') throw new Error('route syntax error, the first must be \'/\'');
  } else {
    if (route[checkPos] === '/') throw new Error('route syntax error, the last must not have \'/\'');
  }
}

exports.delay = delay;
exports.checkRoute = checkRoute;
