import { api } from 'boot/axios'
import { Structure } from 'app/models/Structure'

class StructureQueries {
  async all (corporationId: number): Promise<Structure[]> {
    const response = await api.get(`/corporation/structures/${corporationId}`)
    const total: number = response.data.meta.last_page
    let structures: Structure[] = []
    for (let page = 1; page <= total; page++) {
      const response = await api.get(`/corporation/structures/${corporationId}?page=${page}`)
      structures = structures.concat(response.data.data.map((json: any) => new Structure(json)))
    }
    return structures
  }

  async metenox (corporationId: number): Promise<Structure[]> {
    const structures = await this.all(corporationId)
    return structures.filter((structure: Structure) => structure.typeID === 81826)
  }
}

const queries = new StructureQueries()

export { queries }
