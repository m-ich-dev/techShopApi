export default abstract class Resource {
    public static transform(data: any): any {
        throw new Error("transform must be implemented");
    }

    public static collection<T extends typeof Resource>(
        this: T,
        entities: Parameters<T['transform']>[0][]
    ): ReturnType<T['transform']>[] {
        return entities.map(entity => this.transform(entity));
    }
}