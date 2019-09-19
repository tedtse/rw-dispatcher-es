export default {
  trueValue: '开',
  falseValue: '关',
  separator: '和',
  rangeSeparator: '至',
  readStateRender: {
    input (h, context) {
      return h('span', {
        style: { color: 'cyan' }
      }, context.data.attrs.value)
    }
  }
}
