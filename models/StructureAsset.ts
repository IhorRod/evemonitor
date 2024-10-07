class StructureAsset {
  readonly item_id: number
  readonly quantity: number
  readonly location_id: number
  readonly location_flag: string
  readonly typeID: number
  readonly typeName: string

  constructor (json: any) {
    this.item_id = json.item_id
    this.quantity = json.quantity
    this.location_id = json.location_id
    this.location_flag = json.location_flag
    this.typeID = json.type.typeID
    this.typeName = json.type.typeName
  }
}

export { StructureAsset }
