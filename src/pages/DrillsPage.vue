<template>
  <q-page class="q-pa-md">
    <div v-if="loading" class="loader-wrapper">
      <q-spinner size="200px" color="primary" />
    </div>
    <div v-else>
      <q-table
        :rows="metenoxes"
        :columns="columns"
        row-key="structure.structure_id"
        :rows-per-page-options="[20]"
        :rows-per-page="20"
      >
        <template v-slot:header-cell-fuel-delta>
          <q-th>
            <div class="q-pa-xs">
              Fuel Delta
              <q-input v-model.number="fuelTarget" type="number" dense />
            </div>
          </q-th>
        </template>
        <template v-slot:header-cell-gas-delta>
          <q-th>
            <div class="q-pa-xs">
              Gas Delta
              <q-input v-model.number="gasTarget" type="number" dense />
            </div>
          </q-th>
        </template>
        <template v-slot:body-cell-fuel-days-left="props">
          <q-td :props="props" :class="getCellClass(props.row.leftFuel())">
            {{ formatTime(props.row.leftFuel()) }}
          </q-td>
        </template>
        <template v-slot:body-cell-gas-days-left="props">
          <q-td :props="props" :class="getCellClass(props.row.leftGas())">
            {{ formatTime(props.row.leftGas()) }}
          </q-td>
        </template>
        <template v-slot:body-cell-fuel-delta="props">
          <q-td :props="props">
            {{ calculateFuelDelta(props.row.fuel) }}
          </q-td>
        </template>
        <template v-slot:body-cell-gas-delta="props">
          <q-td :props="props">
            {{ calculateGasDelta(props.row.gas) }}
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from 'vue'
import { collectMetenox } from 'app/helpers/structureUtils'
import { Metenox } from 'app/models/Metenox'

export default defineComponent({
  name: 'DrillsPage',
  setup () {
    const metenoxes: Ref<Metenox[]> = ref([])
    const loading = ref(true)
    const fuelTarget = ref(0)
    const gasTarget = ref(0)

    const columns = [
      { name: 'name', label: 'Name', field: (row: any) => row.structure.name, align: 'left' as const },
      { name: 'fuel', label: 'Fuel', field: 'fuel', align: 'right' as const },
      { name: 'fuel-delta', label: 'Fuel Delta', field: 'fuel-delta', align: 'right' as const },
      { name: 'fuel-days-left', label: 'Fuel Days Left', field: (row: any) => formatTime(row.leftFuel()), align: 'right' as const },
      { name: 'gas', label: 'Gas', field: 'gas', align: 'right' as const },
      { name: 'gas-delta', label: 'Gas Delta', field: 'gas-delta', align: 'right' as const },
      { name: 'gas-days-left', label: 'Gas Days Left', field: (row: any) => formatTime(row.leftGas()), align: 'right' as const }
    ]

    async function init () {
      loading.value = true
      metenoxes.value = await collectMetenox(98750878)

      // Set default targets as max fuel and gas values now
      fuelTarget.value = metenoxes.value.reduce((acc, metenox) => Math.max(acc, metenox.fuel), 0)
      gasTarget.value = metenoxes.value.reduce((acc, metenox) => Math.max(acc, metenox.gas), 0)
      loading.value = false
    }

    onMounted(init)

    const formatTime = (hours: number) => {
      const days = Math.floor(hours / 24)
      const remainingHours = hours % 24
      return `${days} days ${remainingHours} hours`
    }

    const getCellClass = (hours: number) => {
      const days = hours / 24
      if (days < 1) return 'red-cell'
      if (days < 3) return 'yellow-cell'
      return 'green-cell'
    }

    const calculateFuelDelta = (currentFuel: number) => {
      return fuelTarget.value - currentFuel
    }

    const calculateGasDelta = (currentGas: number) => {
      return gasTarget.value - currentGas
    }

    return {
      metenoxes,
      columns,
      formatTime,
      getCellClass,
      calculateFuelDelta,
      calculateGasDelta,
      fuelTarget,
      gasTarget,
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

.red-cell {
  background-color: red;
}

.yellow-cell {
  background-color: yellow;
}

.green-cell {
  background-color: green;
}
</style>
