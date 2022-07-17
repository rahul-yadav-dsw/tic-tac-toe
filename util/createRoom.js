const random = () => {
  const ran = (
    Math.random().toString(36).slice(10) +
    new Date().getTime().toString(36) +
    Math.random().toString(36).slice(10)
  )
    .split(/(.{5})/)
    .filter((O) => O);
  const u = "";
  ran.forEach((e, i) => {
    if (i != 0) {
      u = u + "-" + e;
    } else {
      u = e;
    }
  });
  return u;
};
export default random;
