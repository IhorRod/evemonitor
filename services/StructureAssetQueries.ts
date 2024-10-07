import { api } from 'boot/axios'
import { StructureAsset } from 'app/models/StructureAsset'

class StructureAssetQueries {
  async all (corporationId: number): Promise<StructureAsset[]> {
    const response = await api.get(`/corporation/assets/${corporationId}`)
    const total: number = response.data.meta.last_page
    let structures: StructureAsset[] = []
    for (let page = 1; page <= total; page++) {
      const response = await api.get(`/corporation/assets/${corporationId}?page=${page}`)
      structures = structures.concat(response.data.data.map((json: any) => new StructureAsset(json)))
    }
    return structures
  }

  async structure (corporationId: number, structureId: number): Promise<StructureAsset[]> {
    const assets = await this.all(corporationId)
    return assets.filter((asset: StructureAsset) => asset.location_id === structureId)
  }

  async fuel (corporationId: number, structureId: number): Promise<StructureAsset[]> {
    const assets = await this.structure(corporationId, structureId)
    return assets.filter((asset: StructureAsset) => asset.location_flag === 'StructureFuel')
  }

  async fuelMany (corporationId: number, structureIds: number[]): Promise<StructureAsset[]> {
    const assets = await this.all(corporationId)
    return assets.filter((asset: StructureAsset) => structureIds.includes(asset.location_id) && asset.location_flag === 'StructureFuel')
  }
}

const queries = new StructureAssetQueries()

export { queries }
