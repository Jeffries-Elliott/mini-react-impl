import {ClassComponent, FunctionComponent, HostComponent, HostText, Fragment} from "./ReactWorkTags.js";
import {updateHostComponent, updateHostTextComponent} from "./ReactFiberReconciler.js";

/**
 * 根据wip的tag值，区分不同操作
 * @param wip 正在进行工作的fiber节点
 */
function beginWork(wip) {
  switch (wip.tag) {
    case HostComponent:
      updateHostComponent(wip);
      break;
    case FunctionComponent:
      break;
    case ClassComponent:
      break;
    case HostText:
      updateHostTextComponent(wip);
      break;
    case Fragment:
      break
  }
}

export default beginWork
