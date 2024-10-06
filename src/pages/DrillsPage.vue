<template>
  <div>
    <h1>Drills</h1>
    <p>{{ result }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DrillsPage',
  setup () {
    const result = ref('This is the result from the function')

    function getResult () {
      return result.value
    }

    return {
      result: getResult()
    }
  }
})
</script>
