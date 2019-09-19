<template>
  <table>
    <thead>
      <tr>
        <th>name</th>
        <th>说明</th>
      </tr>
    </thead>
    <tbody>
      <slot name="prepend" />
      <tr>
        <td>${namespace}Render<br />（默认 rwDispatcherRender，camelCase）</td>
        <td>
          read 状态自定义渲染函数。参数是<a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" target="_blank">Vue 函数式组件]</a>中的 context.data 和 context.children
        </td>
      </tr>
      <slot name="append" />
    </tbody>
  </table>
</template>
