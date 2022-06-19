export default abstract class Emitter<E extends string = string> {
    /**
     * @description register event handler to the emitter on target.
     * @notice Only one handler will exist in same target and same event. The later one will be ignore
     * @param event the event
     * @param target the callback's caller
     * @param callback the event handler
     */
    public readonly on: (event: E, target: object, callback: Function) => void;
    /**
     * @description remove event handler of the emitter
     * @example
     * emiter.off('YOUR_EVENT') // remove all the handler of 'YOUR_EVENT'
     * emiter.off(this) // remove all the handler on the 'this' target
     * emiter.off('YOUR_EVENT',this) // only remove the handler of 'YOUR_EVENT' on this target
     * //The following usage is not recommended
     * emiter.off(this,other) // the same as emiter.off(this) other will be ignore.
     */
    public readonly off: (eventOrTarget: E | object, target?: object) => void;
    /**
     * @description register once event handler to the emitter on target
     * @notice Only one handler will exist in same target and same event. The later one will be ignore
     * @param event the event
     * @param target the callback's caller
     * @param callback the event handler
     */
    public readonly once: (
        event: E,
        target: object,
        callback: Function
    ) => void;
    /**
     * @description dispatch event to all the rigsted handler
     * @param event the event
     * @param args the arguments of callback function
     */
    protected readonly emit: (event: E, ...args: any[]) => void;
    /**
     * @description off all handlers
     */
    protected readonly offall: () => void;
}
export class EventCenter<T extends string = string> extends Emitter<T> {
    /**  @description A global shared EventCenter. */
    public static readonly shared: EventCenter;
    /**
     * @description dispatch event to all the rigsted handler
     * @param event the event
     * @param args the arguments of callback function
     */
    public readonly emit: (event: T, ...args: any[]) => void;
    /** @description remove all handler */
    public readonly offall: () => void;
}
