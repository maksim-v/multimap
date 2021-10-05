type Entry = {
    key: string,
    value: unknown;
}

export class Multimap<T extends Object> {
    private readonly _mmap: T;
    private _size: number;

    constructor() {
        this._mmap = Object.create(null);
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    private _get(key: string) {
        return this._mmap[key];
    }

    private _set(key: string, value: unknown) {
        return this._mmap[key] = value;
    }

    private _delete(key: string) {
        delete this._mmap[key];
    }

    keys(): string[] {
        return Object.keys(this._mmap);
    }

    put(key: string, value: unknown): Multimap<T> {
        const existingValues = this._get(key) || [];
        const values = [...existingValues, value];
        this._set(key, values);
        this._size++;
        return this;
    }

    remove(key: string, value: unknown): unknown[] {
        const values = this._get(key);
        let index = -1, removedValues = [];

        if (values) {
            if (typeof value !== 'undefined') {
                index = values.indexOf(value);
                removedValues = index !== -1 ? values.splice(index, 1) : [];
            } else {
                this._delete(key);
                removedValues = values;
            }
        }

        return removedValues;
    }

    hasKey(key: string): boolean {
        const val = this._get(key);
        return typeof val !== 'undefined' && val !== null;
    }

    entries(): Entry[] {
        const entries = [];

        this.keys().forEach(
            key => this._get(key).forEach(
                val => entries.push({ 'key': key, 'value': val })
            )
        );

        return entries;
    }
}