// transient
export const wait = (duration: number) =>
  new Promise((res) => {
    setTimeout(res, duration);
  });
