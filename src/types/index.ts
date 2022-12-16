export type Explorer = {
  id: string;
  name: string;
  isFolder: boolean;
  items: Explorer[];
};

export type ShowInput = {
  visible: boolean;
  isFolder: boolean | null;
};
