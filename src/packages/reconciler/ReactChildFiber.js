import {isArray, isStr} from "../shared/utils.js";
import createFiber from "./ReactFiber.js";

/**
 * 协调子节点，生成fiber链
 * @param returnFiber 父节点fiber
 * @param children 子节点vnode
 */
export function reconcileChildren(returnFiber, children) {
  // 子节点是文本节点，不需要处理
  if (isStr(children)) return;

  // 如果只有一个子节点，那么 children 就是一个vnode对象，如果有多个子节点，那么 children 就是一个vnode数组
  // 将 children 统一都转为数组，方便我们后续的处理
  const newChildren = isArray(children) ? children : [children];

  let previousNewFiber = null; // 上一个 fiber 对象
  let oldFiber = returnFiber.alternate?.child; // 上一个 fiber 对象对应的旧 fiber 对象
  let i = 0; // 记录 children 数组的索引
  let lastPlacedIndex = 0; // 上一次 DOM 节点插入的最远位置

  // 组件初次渲染不需要追踪副作用
  let shouldTrackSideEffects = !!returnFiber.alternate; // 是否需要追踪副作用

  // 第一轮遍历尝试复用节点
  for (; oldFiber && i < newChildren.length; i++) {
    //
  }

  // 从上面的 for 循环出来，有两种情况
  // 1. oldFiber 为 null，说明是初次渲染
  // 2. i === newChildren.length 说明是更新
  if (i === newChildren.length) {
    // TODO 如果还剩余有旧的 fiber 节点，那么就需要将其删除掉
  }

  // 目前只考虑初次渲染的情况
  if (!oldFiber) {
    // 需要将数组的每一个元素都生成一个fiber对象，并串联起来
    for (; i < newChildren.length; i++) {
      const newChildVnode = newChildren[i];
      if (!newChildVnode) continue; // 处理空值

      // 创建fiber
      const newFiber = createFiber(newChildVnode, returnFiber);

      // 更新lastPlacedIndex
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, i, shouldTrackSideEffects);

      // 将新生成的 fiber 更新到 fiber 链表里
      if (previousNewFiber === null) {
        // 说明是第一个子节点
        returnFiber.child = newFiber;
      } else {
        // 保存上一次处理的兄弟fiber节点的sibling属性为当前fiber
        previousNewFiber.sibling = newFiber;
      }
      // 保留对当前fiber对象的引用
      previousNewFiber = newFiber;
    }
  }
}

/**
 * 更新lastPlacedIndex
 * @param {*} newFiber  刚创建的新的 fiber 对象
 * @param {*} lastPlacedIndex 上一次的 lastPlacedIndex，也就是上一次插入的最远位置，初始值是 0
 * @param {*} newIndex 当前的下标，初始值也是 0
 * @param {*} shouldTrackSideEffects 用于判断 returnFiber 是初次渲染还是更新
 */
function placeChild(newFiber, lastPlacedIndex, newIndex, shouldTrackSideEffects) {
  // 更新 fiber 对象上面的 index
  // fiber 对象上面的 index 记录当前 fiber 节点在当前层级下的位置
  newFiber.index = newIndex;
  if (!shouldTrackSideEffects) {
    // 进入此 if，说明当前是初次渲染
    // 那么我们就不需要记录节点位置了
    return lastPlacedIndex;
  }
}
