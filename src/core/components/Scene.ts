import { Container } from "PIXI";
import { GameManager } from "core/managers/GameManager";
import { Entity } from "./Entity";

export class Scene {
  public stage: Container;

  protected entityDict: Map<string, Entity>;

  protected _name: string;

  constructor(name: string) {
    this.stage = new Container();
    this._name = name;
    this.stage.name = `Scene: ${this._name}`;
    this.entityDict = new Map();
  }
  get name() {
    return this._name;
  }
  protected addEntity(entity: Entity, customName?: string) {
    const name = customName || entity.name;
    this.entityDict.set(name, entity);
    return this.getEntity(name);
  }
  protected removeEntity(name: string) {
    this.entityDict.delete(name);
  }
  protected getEntity(name: string) {
    const entity = this.entityDict.get(name);
    if (!entity) throw new Error("指定の Entity が存在しません: " + name);
    return entity;
  }
  protected getEntities() {
    const entries = [...this.entityDict.entries()];
    return entries.reduce(
      (p, [k, v]) => ({ ...p, [k]: v }),
      {} as { [key: string]: Entity }
    );
  }
  destoroy() {
    this.stage.removeChildren();
    this.entityDict.forEach((entity) => {
      entity.destroy();
    });
    this.entityDict.clear();
  }
  setup(
    //@ts-ignore
    $: GameManager
  ): Entity[] {
    return [];
  }
  update(
    //@ts-ignore
    $: GameManager
  ) {}
}
