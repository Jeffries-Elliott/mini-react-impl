function Component(props) {
  this.props = props;
}

// 添加一个标识，来标识这是一个类组件
Component.prototype.isReactComponent = true;

const React = {
  Component,
};

export default React;
