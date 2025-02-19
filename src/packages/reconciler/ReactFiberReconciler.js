import {updateNode} from "../shared/utils.js";

// 处理原生标签元素
export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    // mount阶段
    wip.stateNode = document.createElement(wip.type);
    // 更新节点上的属性
    updateNode(wip.stateNode, {}, wip.props);
  }
}

// 处理文本元素
export function updateHostTextComponent(wip) {
  wip.stateNode = document.createTextNode(wip.props.children);
}
