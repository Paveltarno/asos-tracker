export function sleep(timeoutMs: Number) {
  return new Promise(res => setTimeout(() => res(), timeoutMs));
}
