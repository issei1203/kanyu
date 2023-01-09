const router = require("./app").router;

const port = 8080;

router.listen(port, () => {
    console.log("server running.");
});