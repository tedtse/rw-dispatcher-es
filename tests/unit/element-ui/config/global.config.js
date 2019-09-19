export default {
  activeText: 'on',
  inactiveText: 'off',
  separator: '&',
  rangeSeparator: '>',
  readStateRender: {
    elInput (h, context) {
      return h('span', {
        style: { color: 'yellow' }
      }, context.data.attrs.value)
    }
  }
}
