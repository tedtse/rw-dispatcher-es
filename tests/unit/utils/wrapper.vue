<template>
  <div class="test-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TestWrapper',
  provide () {
    return {
      rwDispatcherProvider: this
    }
  },
  data () {
    return {
      rwDispatcherState: 'read'
    }
  }
}
</script>
