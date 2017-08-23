const express = require('express');
const mustache = require('mustache');

let app = express();

app.use(express.static("public"));

app.get("/test", function(req, resp) {
    let str = mustache.render("Hello {{name}}!!! You are awesome!", {
        name: "Louis"
    })
    resp.send(str)
});

app.listen(80, function() {
    console.log('Server listening on port 80...');
});