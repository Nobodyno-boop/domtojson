export type Config = {
  gzip: boolean;
  logger: boolean;
  nodes: NodeConfig
};

export type Node = {
  node: string;
  value: { [key: string]: string[] };
  spliter: string // default is space
};
export type NodeConfig = {
  in?: Node[]
};

export const DomToJsonConfig = () => {
  const nodeConfig: NodeConfig = { in: [] };

  return {
    in(node: Node) {
      // eslint-disable-next-line fp/no-mutating-methods
      nodeConfig.in.push(node);
    },
	  config: nodeConfig,
  };
};
