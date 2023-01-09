exports.ResponseBodyBuilder = class ResponseBodyBuilder{
    #text
    #errors;

    constructor(proofreadResults) {
        this.#text = proofreadResults.text;

        this.#errors = proofreadResults.message
            .map(result =>
                new ProofreadError(result["line"], result["column"], result["message"])
            );
    }

    toJson() {
        let errors = [];
        this.#errors.forEach(error => errors.push({line:error.getLine(),column:error.getColumn(),message:error.getMessage()}));

        const json =  {text:this.#text,errors:errors};
        return json;
    }
}

class ProofreadError {
    #line
    #column
    #message

    constructor(line,column,message) {
        this.#line = line
        this.#column = column
        this.#message = message
    }

    getLine() {
        return this.#line;
    }

    getColumn() {
        return this.#column;
    }

    getMessage() {
        return this.#message;
    }
}