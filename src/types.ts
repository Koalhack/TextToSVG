export type Config = {
  text: {
    initX: number;
    initY: number;
    incY: number;
    customAttr?: string;
  };
  animation: {
    enabled: boolean;
    attributeName: string;
    values: string;
    dur: number;
    begin: number;
    fill: string;
    calcMode: string;
  };
};
