

export class DataCs {
  constructor(
    public id: number,
    public name: string,
    public backgroundColor: string,
    public color: string,
    public font: string,
    public margin: string,
    public width: string,
    public height: string,
    public padding: string,
    public backgroundImage: string,
    ) { }
}

export class CustomCs {
  constructor(
    public id: number | null,
    public name: string,
    public layout: string,
    public content: string,
    public script: string,
    public targetComponent: string,
    public dependentComponents: string){ }
}

export class MetaTags {
  constructor(
    public price: string,
    public customer : string,
    public worker:string,
  ){}
}
