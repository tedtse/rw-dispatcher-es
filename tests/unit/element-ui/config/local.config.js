export default {
  activeText: '开',
  inactiveText: '关',
  separator: '和',
  rangeSeparator: '至',
  readStateRender: {
    elInput (h, context) {
      return h('span', {
        style: { color: 'cyan' }
      }, context.data.attrs.value)
    }
  }
}
