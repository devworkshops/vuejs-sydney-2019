import { shallowMount } from '@vue/test-utils'
// this component still doesn't exist, so expect an error here
import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {

    let wrapper;

    // this will before every test case
    beforeEach(() => {
        wrapper = shallowMount(Counter);
        expect(wrapper.vm.counter).toBe(0);
    });

    it('increase when click', () => {
        wrapper.find('button').trigger('click')
        expect(wrapper.vm.counter).toBe(1)
        expect(wrapper.find('button').classes('positive')).toBeTruthy()
    })
    it('decrease when right-click', () => {
        wrapper.find('button').trigger('contextmenu')
        expect(wrapper.vm.counter).toBe(-1)
        expect(wrapper.find('button').classes('negative')).toBeTruthy()
    })
})