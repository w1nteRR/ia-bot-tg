export interface IBot {
  initializeWebApp: (url: string) => void;
  listeners: () => void
}
