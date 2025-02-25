import {updateNode} from "../shared/utils.js";
import {reconcileChildren} from "./ReactChildFiber.js";

// 处理原生标签元素
export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    // mount阶段
    wip.stateNode = document.createElement(wip.type);
    // 更新节点上的属性
    updateNode(wip.stateNode, {}, wip.props);
    // 父节点处理完毕后就处理子节点
    reconcileChildren(wip, wip.props.children);
  }
}

// 处理文本元素
export function updateHostTextComponent(wip) {
  wip.stateNode = document.createTextNode(wip.props.children);
}

// 处理函数组件
export function updateFunctionComponent(wip) {
  const { type, props } = wip;
  // 从当前的 wip 上面获取到的 type 是一个函数，直接执行这个函数，获取到它的返回值
  const children = type(props);
  reconcileChildren(wip, children);
}

// 处理类组件
export function updateClassComponent(wip) {
  const { type, props } = wip;
  // 从当前的 wip 上面获取到的 type 是一个类
  const instance = new type(props);
  // 直接调用 render 方法，获取到它的返回值
  const children = instance.render();
  reconcileChildren(wip, children);
}
