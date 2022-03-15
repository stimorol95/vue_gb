import 'regenerator-runtime/runtime'
import { describe, test, expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import Calc from '../views/Calc.vue'

describe('Calculator tests', () => {
  test('Test op1 input value', () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('10')
    expect(wrapper.vm.op1).toBe('10')
  })
  test('Test op2 input value', () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op2]').setValue('3')
    expect(wrapper.vm.op2).toBe('3')
  })
  test('Test method sum', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('10')
    wrapper.find('input[name=op2]').setValue('3')
    await wrapper.vm.check('+')
    await wrapper.find('button[name="+"]').trigger('click')
    expect(wrapper.vm.result).toBe(13)
  })
  test('Test method sub', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('10')
    wrapper.find('input[name=op2]').setValue('3')
    await wrapper.vm.check('-')
    await wrapper.find('button[name="-"]').trigger('click')
    expect(wrapper.vm.result).toBe(7)
  })
  test('Test method mul', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('10')
    wrapper.find('input[name=op2]').setValue('3')
    await wrapper.vm.check('*')
    await wrapper.find('button[name="*"]').trigger('click')
    expect(wrapper.vm.result).toBe(30)
  })
  test('Test method div', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('10')
    wrapper.find('input[name=op2]').setValue('5')
    await wrapper.vm.check('/')
    await wrapper.find('button[name="/"]').trigger('click')
    expect(wrapper.vm.result).toBe(2)
  })
  test('Test method exp', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('10')
    wrapper.find('input[name=op2]').setValue('3')
    await wrapper.vm.check('^')
    await wrapper.find('button[name="^"]').trigger('click')
    expect(wrapper.vm.result).toBe(1000)
  })
  test('Test method intDiv', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('10')
    wrapper.find('input[name=op2]').setValue('3')
    await wrapper.vm.check('÷')
    await wrapper.find('button[name="÷"]').trigger('click')
    expect(wrapper.vm.result).toBe(3)
  })
  test('Test keyboard op1 input', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]')
    await wrapper.find('input[name=toggle]').setChecked()
    await wrapper.find('input[name=radio1]').setChecked()
    wrapper.find('button[name="1"]').trigger('click')
    expect(wrapper.vm.op1).toBe('1')
  })
  test('Test keyboard op2 input', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op2]')
    await wrapper.find('input[name=toggle]').setChecked()
    await wrapper.find('input[name=radio2]').setChecked()
    wrapper.find('button[name="1"]').trigger('click')
    expect(wrapper.vm.op2).toBe('1')
  })
  test('Test keyboard op1 delete symbol', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('10')
    await wrapper.find('input[name=toggle]').setChecked()
    await wrapper.find('input[name=radio1]').setChecked()
    wrapper.find('button[name="remove"]').trigger('click')
    expect(wrapper.vm.op1).toBe('1')
  })
  test('Test keyboard op2 delete symbol', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op2]').setValue('10')
    await wrapper.find('input[name=toggle]').setChecked()
    await wrapper.find('input[name=radio2]').setChecked()
    wrapper.find('button[name="remove"]').trigger('click')
    expect(wrapper.vm.op2).toBe('1')
  })
  test('Test checking the input of an empty string', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('')
    wrapper.find('input[name=op2]').setValue('')
    expect(wrapper.vm.check()).toBe(true)
  })
  test('Test checking for not a number', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('a')
    wrapper.find('input[name=op2]').setValue('b')
    expect(wrapper.vm.check()).toBe(true)
  })
  test('Test checking of division by zero', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('1')
    wrapper.find('input[name=op2]').setValue('0')
    expect(wrapper.vm.check('/')).toBe(true)
  })
  test('Test checking for exponentiation', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('0')
    wrapper.find('input[name=op2]').setValue('-1')
    expect(wrapper.vm.check('^')).toBe(true)
  })
  test('Test checking for false', async () => {
    const wrapper = mount(Calc)
    wrapper.find('input[name=op1]').setValue('10')
    wrapper.find('input[name=op2]').setValue('10')
    expect(wrapper.vm.check()).toBe(false)
  })
})