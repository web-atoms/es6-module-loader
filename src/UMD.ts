/// <reference path="./scriptConverter.ts"/>

type asyncModuleFactory = (module: Module) => Promise<void>;

class Module {

    public exports = {};

    constructor(
        public readonly name: string,
        public readonly url: string,
        private factory: asyncModuleFactory) {
        if (!this.factory) {
            // load url...
            this.factory = async (module) => {
                const response = await fetch(this.url);
                const text = await response.text();


            };
        }
    }

    public async resolve() {
        const f = this.factory;
        if (f) {
            await f(this);
            this.factory = null;
        }
        return this.exports;
    }

}

class UMD {

    public modules: {[key: string]: Module} = {};

    public static register(name, asyncModuleFactory) {

    }

    public static import(name) {

    }

}
