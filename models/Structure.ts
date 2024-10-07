class Structure {
  readonly structure_id: number
  readonly name: string
  readonly typeID: number
  readonly typeName: string

  constructor (json: any) {
    this.structure_id = json.structure_id
    this.name = json.info.name
    this.typeID = json.type.typeID
    this.typeName = json.type.typeName
  }
}

export { Structure }
