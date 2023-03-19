const express = require("express")
const { v4: uuid } = require("uuid")
const app = express()
const port = 3030
const customers = []

app.use(express.json())

// Middleware
function verifyIfExistAccountCPF(request, response, next) {
    const { cpf } = request.headers
    const customer = customers.find(customer => customer.cpf === cpf)
    if(!customer) {
        return response.status(400).json({error: "Customer not found!"})
    }
    request.customer = customer
    return next()
}
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

app.get("/statement", verifyIfExistAccountCPF, (request, response) => {
    const { customer } = request
    return response.json(customer.statement)
})

app.post("/deposit", verifyIfExistAccountCPF, (request, response) => {
    const { description, amount } = request.body

    const { customer } = request

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
})

app.listen(port, () => {
    console.log(`Api started on port ${port}`)
})