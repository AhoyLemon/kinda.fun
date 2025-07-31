import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../../views/home/Home.vue'

describe('Home Games', () => {
  it('includes Invalid and Wrongest games in the data', () => {
    const wrapper = mount(Home)
    const vm = wrapper.vm
    
    // Check that thingData contains the invalid game
    expect(vm.thingData).toHaveProperty('invalid')
    expect(vm.thingData.invalid.name).toBe('Invalid')
    expect(vm.thingData.invalid.url).toContain('/invalid')
    
    // Check that thingData contains the wrongest game
    expect(vm.thingData).toHaveProperty('wrongest')
    expect(vm.thingData.wrongest.name).toBe('The Wrongest Words')
    expect(vm.thingData.wrongest.url).toContain('/wrongest')
  })

  it('includes both games in computed things list', () => {
    const wrapper = mount(Home)
    const vm = wrapper.vm
    
    const gamesList = vm.computedThingsList
    const gameNames = gamesList.map(game => game.name)
    
    expect(gameNames).toContain('Invalid')
    expect(gameNames).toContain('The Wrongest Words')
  })
})