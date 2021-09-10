// ref: https://github.com/ReactTraining/react-router/blob/262b45dd8d6cbdc3a984259c5591ffc3de80d600/packages/react-router/index.tsx#L1049
export const trimTrailingSlashes = (path: string) => path.replace(/\/+$/, '');
export const normalizeSlashes = (path: string) => path.replace(/\/\/+/g, '/');
export const joinPaths = (paths: string[]) => normalizeSlashes(paths.join('/'));
export const splitPath = (path: string) => normalizeSlashes(path).split('/');
