iview-rw-dispatcher 也提供了 typescript 的支持。

### RWDispatcher

由于 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) 中的 `Provide` 不能满足要求，所以重新写了一个 [provide 装饰器](https://github.com/tedtse/iview-rw-dispatcher/blob/master/rw-dispatcher.js#L6-L35)。

另外，`rwDispatcherState`（默认）和 `rwDispatcherConfig` 又有命名空间等多方面考虑，于是就封装了一个 class `RWDispatcher`，直接继承 `Vue`。

### 使用

```js
import { Component } from 'vue-property-decorator';
import { RWDispatcher } from 'element-ui-rw-dispatcher';

@Component
export default class DispatcherDemo extends RWDispatcher {
  ...
}
```

把 `class DispatcherDemo extends Vue` 换成 `class DispatcherDemo extends RWDispatcher` 即可，其它保持不变，详细例子请看 [demo](https://github.com/tedtse/iview-rw-dispatcher-example/tree/master/ts)

### 方法

RWDispatcher 暴露出来以下方法

| 方法名 | 说明 | 参数 | 返回值 |
| ---- | -------- | ---- | ---- |
| getRWDispatcherState | 获取状态 | | 'read' \| 'write' |
| setRWDispatcherState | 设置状态 | 'read' \| 'write' | undefined |
| getRWDispatcherConfig | 获取局部配置 | | object |
| setRWDispatcherConfig | 设置局部配置 | object | undefined |