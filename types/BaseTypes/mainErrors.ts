
export interface Errors {
  [index: string]: {
    text?: string,
    error?: boolean
  };
}

export interface BaseErrors {
  modal: Errors,
}
