/** Minimal MktoForms2 typings for programmatic submit (Forms 2.0). */
export interface MktoForm {
  vals: (fields: Record<string, string>) => void;
  submit: () => void;
  onSuccess: (cb: (values: unknown, followUpUrl?: string) => boolean | void) => void;
}

export interface MktoForms2Global {
  loadForm: (
    baseUrl: string,
    munchkinId: string,
    formId: number,
    callback?: (form: MktoForm) => void
  ) => void;
}

declare global {
  interface Window {
    MktoForms2?: MktoForms2Global;
  }
}

export {};
