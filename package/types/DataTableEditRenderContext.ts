export type DataTableEditRenderContext = {
  value: string;
  onChange: (value: string) => void;
  /** Commit the edit. Pass an optional value to override the tracked input value
   *  (useful for custom controls like Select that change + commit in one event). */
  onCommit: (value?: string) => void;
  onCancel: () => void;
};
