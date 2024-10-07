import { queries as StructureQueries } from 'app/services/StructureQueries'
import { queries as StructureAssetQueries } from 'app/services/StructureAssetQueries'
import { Metenox } from 'app/models/Metenox'
import { StructureAsset } from 'app/models/StructureAsset'
import { Structure } from 'app/models/Structure'

async function collectMetenox (corporationId: number): Promise<Metenox[]> {
  type StructureInput = {
    structure: Structure,
    fuelassets: StructureAsset[]
  }
  const structure = await StructureQueries.metenox(corporationId)
  const fuels = await Promise.all(structure.map(async (structure) => {
    const fuelassets = await StructureAssetQueries.fuel(corporationId, structure.structure_id)
    return {
      structure,
      fuelassets
    } as StructureInput
  }))

  return fuels.map((structure) => {
    const gas = structure.fuelassets.find((asset) => asset.typeID === 81143)?.quantity || 0
    const fuel = structure.fuelassets.filter((asset) => asset.typeID !== 81143)
      .map((asset) => asset.quantity).reduce((a, b) => a + b, 0)
    return new Metenox(structure.structure, fuel, gas)
  })
}

export { collectMetenox }