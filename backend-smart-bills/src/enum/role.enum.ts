export enum Role {
  member = 'member',
  admin = 'admin',
  user = 'user',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Role {
  export function all(): Role[] {
    return Object.keys(Role).map((key) => Role[key]);
  }
}
