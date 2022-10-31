export function wait(ms: number) {
  return new Promise((res, rej) => setTimeout(() => res(true), ms));
}
