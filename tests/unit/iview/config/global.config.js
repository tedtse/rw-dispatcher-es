export default {
  trueValue: 'on',
  falseValue: 'off',
  separator: '&',
  rangeSeparator: '>',
  readStateRender: {
    input (h, context) {
      return h('span', {
        style: { color: 'yellow' }
      }, context.data.attrs.value)
    }
  }
}
