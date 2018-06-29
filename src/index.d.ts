export function get(
  target: string,
  opts?: {
    params?: { [param: string]: any };
    base?: string;
    args?: { [arg: string]: string };
    json?: boolean;
    opts?: {};
    ref?: boolean;
  }
): Promise<{}>;

export function post(
  target: string,
  opts?: {
    body: { [param: string]: any };
    params?: { [param: string]: any };
    base?: string;
    args?: { [arg: string]: string };
    json?: boolean;
    opts?: {};
    ref?: boolean;
  }
): Promise<{}>;
