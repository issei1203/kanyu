exports.proofreadError = class ProofreadError {
    #line
    #column
    #message

    constructor(line,column,message) {
        this.#line = line
        this.#column = column
        this.#message = message
    }
}