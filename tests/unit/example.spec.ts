import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('should do nothing and pass', () => {
    // On monte simplement le composant sans rien tester.
    const wrapper = shallowMount(HelloWorld)
    
    // Pas d'assertion ici, donc le test passe sans rien vérifier.
  })
})
