var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var importRegex = /import\s+(([^"]+)("[^"]+"))/g;
var importsRegex = /({[^\}]+\}\s*\,?)|(\*\s+as\s+[a-z0-9\_]+\s*\,?)|([a-z0-9\_]+\s*\,?)/gi;
function scriptConverter(script) {
}
class Module {
    constructor(name, url, factory) {
        this.name = name;
        this.url = url;
        this.factory = factory;
        this.exports = {};
        if (!this.factory) {
            this.factory = (module) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(this.url);
                const text = yield response.text();
            });
        }
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const f = this.factory;
            if (f) {
                yield f(this);
                this.factory = null;
            }
            return this.exports;
        });
    }
}
class UMD {
    constructor() {
        this.modules = {};
    }
    static register(name, asyncModuleFactory) {
    }
    static import(name) {
    }
}
//# sourceMappingURL=loader.js.map