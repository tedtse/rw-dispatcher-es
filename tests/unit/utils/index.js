import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import ElementUI from 'element-ui'
import ElementUIRWDispatcher from 'element-ui-rw-dispatcher'
import iView from 'iview'
import iViewRWDispatcher from 'iview-rw-dispatcher'
import merge from 'lodash/merge'
import Wrapper from './wrapper'

export const createWrapper = (dispatcher, wrapperOpts) => {
  return mount(Wrapper, merge({
    slots: {
      default: dispatcher
    }
  }, wrapperOpts))
}

export const useElePlugin = (opts = {}) => {
  Vue.use(ElementUI)
  Vue.use(ElementUIRWDispatcher, opts)
}

export const useIViewPlugin = (opts = {}) => {
  Vue.use(iView)
  Vue.use(iViewRWDispatcher, opts)
}

export const createLocalVue4Ele = (opts = {}) => {
  const localVue = createLocalVue()
  localVue.use(ElementUI)
  localVue.use(ElementUIRWDispatcher, opts)
  return localVue
}
