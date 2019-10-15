const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
server.use(jsonServer.defaults())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
const SECRET_KEY = '123456789'
const expiresIn = '1h'
// Create a token from a payload
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) =>
        decode !== undefined ? decode : err
    )
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
    return (
        userdb.users.findIndex(
            user => user.email === email && user.password === password
        ) !== -1
    )
}

server.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    if (isAuthenticated({ email, password }) === false) {
        const status = 401
        const message = 'Incorrect email or password'
        res.status(status).json({ status, message })
        return
    }
    var user = userdb.users.find(
        u => u.email === email && u.password === password
    )
    const access_token = createToken({ email: user.email, name: user.name })
    res.status(200).json({ access_token })
})

server.get('/user', (req, res) => {
    res.status(200).json(jwt.decode(req.headers.authorization.split(' ')[1]))
    return
})

function validateSuppliers(req, res, next) {
    console.log('validating')
    const { address, companyName, contactName, contactTitle } = req.body
    var errors = {}

    if (!companyName) errors.companyName = 'Required'
    if (!contactName) errors.contactName = 'Required'
    if (!contactTitle) errors.contactTitle = 'Required'
    if (!address) errors.address = 'Required'
    else {
        if (!address.street) errors['address.street'] = 'Required'
        if (!address.city) errors['address.city'] = 'Required'
        if (!address.region) errors['address.region'] = 'Required'
        if (!address.postalCode) errors['address.postalCode'] = 'Required'
        if (!address.country) errors['address.country'] = 'Required'
        else {
            if (address.country.toLowerCase() == 'australia') {
                if (address.postalCode.length != 4) {
                    errors['address.postalCode'] = 'Invalid'
                }
            }
        }
    }
    if (Object.keys(errors).length > 0) {
        res.status(422).json({ errors })
    } else {
        next()
    }
}

server.post('/suppliers', validateSuppliers)
server.put(/^\/suppliers\/.*$/, validateSuppliers)

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (
        req.headers.authorization === undefined ||
        req.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
        const status = 401
        const message = 'Bad authorization header'
        res.status(status).json({ status, message })
        return
    }
    try {
        verifyToken(req.headers.authorization.split(' ')[1])
        next()
    } catch (err) {
        const status = 401
        const message = 'Error: access_token is not valid'
        res.status(status).json({ status, message })
    }
})
server.use(router)

server.listen(3000, () => {
    console.log('Run Auth API Server')
})