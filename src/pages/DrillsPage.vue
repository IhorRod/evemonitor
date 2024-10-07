<template>
  <q-page class="q-pa-md">
    <div v-if="loading" class="loader-wrapper">
      <q-spinner size="200px" color="primary" />
    </div>
    <div v-else>
      <div v-for="(row, rowIndex) in chunked" :key="rowIndex" class="q-gutter-md row">
        <q-card v-for="metenox in row" :key="metenox.structure.structure_id" :class="['q-mb-md', 'col-2', getCardClass(metenox)]">
          <q-card-section>
            <div class="text-h6">{{ metenox.structure.name }}</div>
            <div>Fuel left: {{ formatTime(metenox.leftFuel()) }}</div>
            <div>Gas left: {{ formatTime(metenox.leftGas()) }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref, computed } from 'vue'
import { collectMetenox } from 'app/helpers/structureUtils'
import { Metenox } from 'app/models/Metenox'

export default defineComponent({
  name: 'DrillsPage',
  setup () {
    const metenoxes: Ref<Metenox[]> = ref([])
    const loading = ref(true)

    function chunkingArray (array: Metenox[], size: number) {
      const chunked = []
      const copied = [...array]
      const numOfChild = Math.ceil(copied.length / size)
      for (let i = 0; i < numOfChild; i++) {
        chunked.push(copied.splice(0, size))
      }
      return chunked
    }

    const chunked = computed(() => chunkingArray(metenoxes.value, 5))

    async function init () {
      loading.value = true
      metenoxes.value = await collectMetenox(98750878)
      loading.value = false
    }

    onMounted(init)

    const getCardClass = (metenox: Metenox) => {
      const hoursLeft = metenox.leftFuel()
      if (hoursLeft <= 24) {
        return 'bg-red'
      } else if (hoursLeft <= 72) {
        return 'bg-yellow'
      } else {
        return 'bg-green'
      }
    }

    const formatTime = (hours: number) => {
      const days = Math.floor(hours / 24)
      const remainingHours = hours % 24
      return `${days} days ${remainingHours} hours`
    }

    return {
      chunked,
      getCardClass,
      formatTime,
      loading
    }
  }
})
</script>

<style scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.bg-red {
  background-color: #ffcccc;
}
.bg-yellow {
  background-color: #ffffcc;
}
.bg-green {
  background-color: #ccffcc;
}
</style>
