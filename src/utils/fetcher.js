const fetcher = (...args) => fetch(...args).then((r) => r.json());

export default fetcher;
