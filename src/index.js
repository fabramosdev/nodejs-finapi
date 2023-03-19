const express = require("express")

const app = express()
const port = 3030

app.use(express.json())

app.listen(port, () => {
    console.log(`Api started on port ${port}`)
})