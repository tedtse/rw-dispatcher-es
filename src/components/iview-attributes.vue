<template>
  <table>
    <thead>
      <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
      </tr>
    </thead>
    <tbody>
      <slot name="prepend" />
      <tr>
        <td>${namespace}-state<br />（默认 rw-dispatcher-state，kebeb-case）</td>
        <td>组件状态，可选值为 "read"|"write"，优先级高于局部状态</td>
        <td>Function(h, context)</td>
        <td>undefined</td>
      </tr>
      <tr>
        <td>${namespace}-render<br />（默认 rw-dispatcher-render，kebeb-case）</td>
        <td>自定义渲染函数（props 形式）</td>
        <td>Function(h, context)</td>
        <td>undefined</td>
      </tr>
      <slot name="append" />
    </tbody>
  </table>
</template>
