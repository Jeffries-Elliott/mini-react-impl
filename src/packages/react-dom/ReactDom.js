import createFiber from "../reconciler/ReactFiber.js";
import scheduleUpdateOnFiber from "../reconciler/ReactFiberWorkLoop.js";

/**
 * 更新容器的方法
 * @param {*} element 要挂载的 vnode 树
 * @param {*} container 容器的 DOM 节点
 */
function updateContainer(element, container) {
  const fiber = createFiber(element, {
    // 该对象就是我的父 fiber 对象，里面会放置一些核心的属性
    type: container.nodeName.toLowerCase(),
    stateNode: container,
  });
  console.log(fiber);
  scheduleUpdateOnFiber(fiber);
}

class ReactDOMRoot {
  constructor(container) {
    // 将拿到的根 DOM 节点在内部保存一份
    this._internalRoot = container;
  }
  /**
   * 渲染方法
   * @param {*} children 要挂载到根节点的 vnode 树
   */
  render(children) {
    updateContainer(children, this._internalRoot);
  }
}

const ReactDom = {
  /**
   * 创建根组件
   * @param {HTMLElement} container 根 DOM 节点
   * @returns 返回一个包含 render 方法的对象
   */
  createRoot(container) {
    return new ReactDOMRoot(container);
  }
}

export default ReactDom
