import {isFn, isStr, isUndefined, NoFlags} from "../shared/utils.js";
import {ClassComponent, Fragment, FunctionComponent, HostComponent, HostText} from "./ReactWorkTags.js";

/**
 * 创建fiber对象
 * @param vnode 当前vnode节点
 * @param returnFiber 父fiber节点
 */
function createFiber(vnode, returnFiber) {
  const fiber = {
    tag: null,
    // fiber 的类型
    type: vnode.type,
    // key
    key: vnode.key,
    // props
    props: vnode.props,
    // 存储当前的 fiber 对象所对应的 真实DOM 节点
    stateNode: null,
    // 整个 fiber 树是以链表的形式串联起来的，因此需要 child、sibling 保存引用关系
    // 子 fiber
    child: null,
    // 兄弟 fiber
    sibling: null,
    // 父 fiber
    return: returnFiber,
    // 该 fiber 对象要做的具体操作
    flags: NoFlags,
    // 记录当前节点在当前层级下的位置
    index: null,
    // 存储旧的 fiber 对象，用于双缓冲
    alternate: null,
  };

  const type = vnode.type
  if (isStr(type)) {
    fiber.tag = HostComponent;
  } else if (isFn(type)) {
    // 函数组件和类组件的 type 都是 function
    // 通过判断 type 是否有 isReactComponent 属性来判断是否为类组件
    if (type.prototype?.isReactComponent) {
      // 类组件
      fiber.tag = ClassComponent;
    } else {
      fiber.tag = FunctionComponent;
    }
  } else if (isUndefined(type)) {
    // 没有节点类型，说明是纯文本节点
    fiber.tag = HostText;
    // 文本节点是没有 props 属性的，为了兼容其他类型数据结构，增加children字段
    fiber.props = {
      children: vnode,
    };
  } else {
    fiber.tag = Fragment;
  }

  return fiber;
}

export default createFiber
