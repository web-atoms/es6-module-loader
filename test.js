var importRegex = /import\s+(([^"]+)("[^"]+"))/g;
var importsRegex = /({[^\}]+\}\s*\,?)|(\*\s+as\s+[a-z0-9\_]+\s*\,?)|([a-z0-9\_]+\s*\,?)/gi;

function convertScript(s) {
    return s.replace(importRegex, (a, all, imports, from) => {
        imports = imports.trim();
        imports = imports.substring(0, imports.length - 4).trim();
        // console.log([imports, from]);
        let args = [];
        imports = imports.replace(importsRegex, (i, destructure, def, star) => {
            // console.log(ia);
            if (destructure !== void 0) {
                args.push(false);
                return i.replace(/\s+as\s+/g, ":").trim(); 
            }
            if (def !== void 0) {
                args.push(true);
                return i.replace(/\*\s+as/g,"").trim();
            }
            if (star !== void 0) {
                args.push(false);
                return i.trim();
            }
            return i;
        });
        from = `await module.import(${from}, ${args})`;
        return `let [${imports}] = ${from}`;
    });
}

console.log(convertScript(`import a from "a";
import * as b from "b";
import c, * as d from "c";
import {e as f, g} from "c";`));