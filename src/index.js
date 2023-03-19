const express = require("express")
const { v4: uuid } = require("uuid")
const app = express()
const port = 3030
const customers = []

app.use(express.json())

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - Array
 */
app.post("/account",
    (request, response) => {
        const {cpf, name} = request.body

        const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

        if(customerAlreadyExists) {
            return response.status(400).json({error: "Customer already exists!"})
        }

        customers.push({
            cpf,
            name,
            id: uuid(),
            statement: []
        })

        return response.status(201).send()
    })

app.listen(port, () => {
    console.log(`Api started on port ${port}`)
})