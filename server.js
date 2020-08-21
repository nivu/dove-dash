const express = require('express')
const app = express()

app.use(express.static("./dist/dove-dash"));
app.get("/*", function (req, res) {
    res.sendFile("index.html", {
        root: "dist/dove-dash/"
    });
});

app.listen(process.env.PORT || 8000, () => {
    console.log(`Example app listening at http://localhost:${8000}`)
})