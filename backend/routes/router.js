const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const nameFile = path.join(__dirname, '../data/names.json')

router.get('/names', (req, res) => {
    const names = JSON.parse(fs.readFileSync(nameFile, 'utf8'))
    res.json(names)
})

router.post('/names', (req, res) => {
    const names = JSON.parse(fs.readFileSync(nameFile, 'utf8'))

    const newNameId = `p${Date.now()}`

    const newName = {
        id: newNameId,
        user: req.body.user
    }

    names.push(newName)
    fs.writeFileSync(nameFile, JSON.stringify(names, null, 2))

    res.status(201).json({
        name: newName
    })
})

router.delete('/names/:id', (req, res) => {
    const names = JSON.parse(fs.readFileSync(nameFile, 'utf8'))
    const idToDelete = req.params.id

    const filteredNames = names.filter(name => name.id !== idToDelete)
    fs.writeFileSync(nameFile, JSON.stringify(filteredNames, null, 2))

    res.status(200).json({ message: 'Name deleted successfully' })
})

module.exports = router