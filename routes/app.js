const express = require('express');
const Proofread = require("../models/proofread").Proofread;
const ResponseBodyBuilder = require("../models/responseBody").ResponseBodyBuilder;
const router = express();

router.use(express.json()); // リクエストパラメータはjson
router.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencodedも対応できるようにする

const proofread = new Proofread();
const paramRegex = new RegExp(/^( |　)*$/);

router.post('/proofread', async function(request, response) {

    if(typeof request.body.text === 'undefined') {
        return response.json({});
    }

    if(typeof request.body.format == 'undefined') {

    }

    const text = request.body.text;

    if(paramRegex.test(text)) {
        return response.json({});
    }

    const proofreadResult = await proofread.exec(text);
    const responseBodyBuilder = new ResponseBodyBuilder(proofreadResult);

    response.json(responseBodyBuilder.toJson());
});

//404のカスタムエラーハンドリング
router.use(( request, response) => {
    response.status(404).send();
});

exports.router = router;