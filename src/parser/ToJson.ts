import { Config, NodeConfig } from '../config';
import { events } from '../Event';

export type DomToJsonNode = {
  node: string,
  text: string,
  childs?: DomToJsonNode[]
  attr?: {
    name: string,
    value: string
  }[]
};

const traverse = (el: HTMLElement | Element) : any => {
  return Array.from(el.children)
    .map((element) => {
      return element.children.length > 0 ? [element, traverse(element)].flat() : element;
    })
    .flat();
};

type Base = {
  last: Node
};

const getAttribute = (node: Node, el: Element, config: NodeConfig) => {
  const attributes = Array
    .from(el.attributes)
    .map((attribute) => {
      return {
        name: attribute.name,
        value: attribute.nodeValue,
      };
    });

  return config?.in
    ? attributes.map((attribute) => {
      const currentNodeConfig = config.in.find((nodeConfig) => {
        return nodeConfig.node.toLowerCase() === node.nodeName.toLowerCase()
          && nodeConfig.value[attribute.name];
      });
      if (!currentNodeConfig) {
        return attributes;
      }
      // eslint-disable-next-line no-nested-ternary
      const spliter = currentNodeConfig
        ? currentNodeConfig.spliter ? currentNodeConfig.spliter : ' '
        : ' ';
      const filteredAttributes = attribute
        .value
        .split(spliter)
        .filter((value) => {
          return currentNodeConfig.value[attribute.name].includes(value);
        })
        .join(spliter);
      return {
        name: attribute.name,
        value: filteredAttributes,
      };
    })
      .filter(Boolean)
    : attributes;
};

const parse = ({ node, config, base }: { node: Node, base: Base | null, config:Config }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore prefer-const
  // console.group(node.nodeName);
  const isText = node.nodeType === Node.TEXT_NODE;
  const attributes = isText ? [] : events.emit('attributes', { value: node }) as any;
  if (!node.hasChildNodes()) {
    // console.log(node);
    // console.groupEnd();
    return {
      node: node.nodeName.toLowerCase(),
      text: node.textContent,
      ...(attributes.length > 0 ? { attr: attributes } : {}),
    };
  }
  const { firstChild } = node;
  const textChild = firstChild?.textContent;
  const childs : any = node.childNodes.length > 1 ? Array.from(node.childNodes)
    .map((x) => {
      return parse({
        node: x,
        config,
        base: { last: node },
      });
    }) : null;

  // console.groupEnd();
  return {
    node: node.nodeName.toLowerCase(),
    ...(textChild ? { text: textChild } : null),
    ...(node.childNodes.length > 1 && base?.last.textContent !== textChild ? { childs } : null),
    ...(attributes.length > 0 ? { attr: attributes } : {}),
  };
};

const ToJson = (element: HTMLElement, config: Config) => {
  const tempElements = traverse(element);
  events.on('attributes', ({
    value,
  }: { value:Node }) => {
    const el = tempElements.find((tempElement:Element) => {
      return tempElement.isSameNode(value);
    });
    return getAttribute(value, el, config?.nodes);
  });

  return Array
    .from(element.childNodes)
    .map((el) => {
      return parse({ node: el, config, base: null });
    });
};
export default ToJson;
