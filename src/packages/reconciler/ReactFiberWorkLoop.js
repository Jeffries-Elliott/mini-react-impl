// work in progress，表示正在进行的工作
// 保存当前正在进行的工作 fiber 对象
let wip = null;

// 保存当前根节点的 fiber 对象
let wipRoot = null;

function scheduleUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;

  // 每一帧有空闲时间的时候，就会执行 workloop 函数，有兼容性问题
  requestIdleCallback(workloop);
}

function workloop(deadline) {
  while (wip && deadline.timeRemaining() > 0) {
    // 有需要进行处理的 fiber 节点
    performUnitOfWork(); // 处理一个 fiber 节点
  }

  // 两种情况
  // 1. 没有剩余时间，不做处理
  // 2. 整个fiber树全部处理完毕
  if (!wip) {
    // 将 wipRoot 提交到 DOM 节点上
    commitRoot();
  }
}

/**
 * 处理一个 fiber 节点：
 * 1. 处理当前的 fiber 对象
 * 2. 通过深度优先遍历子节点，生成子节点的 fiber 对象，然后继续处理
 * 3. 提交副作用
 * 4. 进行渲染
 */
function performUnitOfWork() {
  // beginWork(wip); // TODO 处理当前的 fiber 对象

  // 如果有子节点，将 wip 更新为子节点
  if (wip.child) {
    wip = wip.child;
    return;
  }

  // completeWork(wip); // TODO 当前fiber 处理完毕

  // 如果没有子节点，就需要找到兄弟节点
  let next = wip; // 先缓存一下当前的 wip
  while (next) {
    if (next.sibling) {
      wip = next.sibling;
      return;
    }

    // 如果没有进入上面的 if，说明当前节点后面已经没有兄弟节点了
    // 那么就需要将父节点设置为当前正在工作的节点，然后在父亲那一层继续寻找兄弟节点
    next = next.return;

    // TODO 在寻找父亲那一辈的兄弟节点之前，先执行一下 completeWork 方法
    // completeWork(next);
  }

  // 执行到这里，说明整个 fiber 树都处理完了
  wip = null;
}

// TODO 将 wipRoot 提交到 DOM 节点上
function commitRoot() {}

export default scheduleUpdateOnFiber;
