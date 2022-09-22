const params = new URLSearchParams(window.location.search);
const test = params.get("id");

console.log({ test });
