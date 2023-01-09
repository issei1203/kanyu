const TextLintEngine = require('textlint').TextLintEngine;
const path = require('path')

exports.Proofread = class Proofread {

    #engine;

    constructor() {
        const config = {configFile: path.join(__dirname, '../config/.textlintrc')}
        this.#engine = new TextLintEngine(config);
    }

    async exec(text) {
        const engine = this.#engine;
        const resultProofread = await engine.executeOnText(text);
        return {text: text, message: resultProofread[0].messages}
    }

}