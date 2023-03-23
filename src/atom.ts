import './fake'

export type Cache<T> = T | Error

export enum CacheState {
    Actual = 'Actual',
    Check = 'Check',
    Dirty = 'Dirty',
}

export enum CacheType {
    Data = 'Data',
    Error = 'Error',
}

let evalContext = null as Atom | null

class Atom<T = any> {
    readonly reducer: () => T

    //node?: Node
    sourcesHead?: Node
    sourcesTail?: Node
    targetsHead?: Node
    targetsTail?: Node

    private cache?: Cache<T>
    private cacheType?: CacheType
    private cacheState = CacheState.Dirty

    constructor(reducer: () => T) {
        this.reducer = reducer
    }

    get() {
        if (this.establishRelations()) {
            if (this.cacheState !== CacheState.Actual) {
                this.rebuild()
            }

            if (this.cacheType === CacheType.Error) {
                throw this.cache
            }

            return this.cache!
        }

        return this.build()
    }

    build() {
        let value: T | Error
        let error: boolean

        try {
            value = this.reducer()
            error = false
        } catch (e) {
            value = e as Error
            error = true
        }

        if (error) {
            throw value
        }

        return value as T
    }

    setCacheState(state: CacheState) {
        this.cacheState = state
    }

    isCacheState(state: CacheState) {
        return this.cacheState === state
    }

    rebuild(node?: Node) {
        check: if (this.isCacheState(CacheState.Check)) {
            for (let node = this.sourcesHead; node; node = node.nextSource) {
                if (node.source.rebuild(node)) {
                    break check
                }
            }
        }

        if (this.isCacheState(CacheState.Dirty)) {
            const context = this.trackRelations()

            let newCache: Cache<T>
            let newCacheType: CacheType

            try {
                newCache = this.build()
                newCacheType = CacheType.Data
            } catch (e) {
                newCache = e as Error
                newCacheType = CacheType.Error
            }

            this.untrackRelations(context)

            if (this.cache !== newCache || this.cacheType !== newCacheType) {
                this.cache = newCache
                this.cacheType = newCacheType

                for (let node = this.targetsHead; node; node = node.nextTarget) {
                    node.target.setCacheState(CacheState.Dirty)
                }

                this.setCacheState(CacheState.Actual)

                return true
            }
        }

        this.setCacheState(CacheState.Actual)

        return false
    }

    establishRelations() {
        if (!evalContext) {
            return false
        }

        const node = {
            source: this,
            target: evalContext,
            prevSource: evalContext.sourcesTail,
            nextSource: undefined,
            prevTarget: this.targetsTail,
            nextTarget: undefined,
        }

        if (evalContext.sourcesTail) {
            evalContext.sourcesTail.nextSource = node
        }

        evalContext.sourcesTail = node

        if (!evalContext.sourcesHead) {
            evalContext.sourcesHead = node
        }

        if (this.targetsTail) {
            this.targetsTail.nextTarget = node
        }

        this.targetsTail = node

        if (!this.targetsHead) {
            this.targetsHead = node
        }

        return true
    }

    trackRelations() {
        try {
            return evalContext
        } finally {
            evalContext = this
        }
    }

    untrackRelations(context: Atom | null) {
        evalContext = context
    }

    // dispose(initiator?: Atom) {
    //     if (initiator) {
    //         for (let node = this.targets; node; node = node.prevTarget) {
    //             if (node.target === initiator) {
    //                 if (node.prevTarget !== undefined) {
    //                     node.prevTarget.nextTarget = node.nextTarget
    //                 }
    //                 if (node.nextTarget !== undefined) {
    //                     node.nextTarget.prevTarget = node.prevTarget
    //                 }

    //                 break
    //             }
    //         }
    //     }

    //     if (!this.targets) {
    //         if (this.disposeListeners) {
    //             for (const listener of this.disposeListeners) {
    //                 listener(this.cache!)
    //             }

    //             this.disposeListeners = undefined
    //         }

    //         this.cache = undefined
    //         this.cacheType = undefined
    //         this.cacheState = CacheState.Dirty

    //         if (this.hasDependencies()) {
    //             for (const dependency of this.eachDependencies()) {
    //                 dependency.dispose(this)
    //             }

    //             this.dependency = undefined
    //             this.dependencies = undefined
    //         }
    //     }
    // }
}

type Node = {
    source: Atom
    prevSource?: Node
    nextSource?: Node
    target: Atom
    prevTarget?: Node
    nextTarget?: Node
    //version: number
    //prevNode?: Node
    //nextNode?: Node
}

class Process {
    private readonly entries = new Set<Atom>()
    private readonly roots = new Set<Atom>()

    rebuild(atom: Atom) {
        this.entries.add(atom)
    }

    run() {
        for (const atom of this.entries) {
            this.findRoots(atom, CacheState.Dirty)
        }

        for (const atom of this.roots) {
            atom.rebuild()
        }
    }

    private findRoots(atom: Atom, state: CacheState) {
        atom.setCacheState(state)

        if (!atom.targetsHead) {
            this.roots.add(atom)
            return
        }

        for (let node: Node | undefined = atom.targetsHead; node; node = node.nextTarget) {
            if (node.target.isCacheState(CacheState.Actual)) {
                this.findRoots(node.target, CacheState.Check)
            }
        }
    }
}

let key: symbol | null = null
let prc: Process | null = null

export const build = <T>(cb: (process: Process) => T): T => {
    const localKey = Symbol()

    if (prc === null) {
        prc = new Process()

        if (key === null) {
            key = localKey
        }
    }

    const result = cb(prc)

    while (key === localKey) {
        const process = prc!

        prc = null

        process.run()

        if (prc === null) {
            key = null
        }
    }

    return result
}

export interface Computed<T = unknown> {
    (): T
}

export const computed = <T>(reducer: () => T): any => {
    const atom = new Atom(reducer)
    const accessor = () => atom.get()

    Object.defineProperties(accessor, {
        atom: {
            value: atom,
            writable: false,
            enumerable: false,
            configurable: false,
        },
    })

    return accessor as Computed<T>
}

export interface Observable<T = unknown> extends Computed<T> {
    (value: T): void
}

export const observable = <T>(value: T): any => {
    const reducer = () => value

    const atom = new Atom(reducer)

    const accessor = (...args: [T]) => {
        if (args.length === 1) {
            value = args[0]

            if (atom.targetsHead) {
                build((p) => p.rebuild(atom))
            }

            return
        } else {
            return atom.get()
        }
    }

    Object.defineProperties(accessor, {
        atom: {
            value: atom,
            writable: false,
            enumerable: false,
            configurable: false,
        },
    })

    return accessor as Computed<T>
}

export const autorun = (reducer: () => void) => {
    const atom = new Atom(reducer)

    build((p) => p.rebuild(atom))

    //return () => atom.dispose()
}
