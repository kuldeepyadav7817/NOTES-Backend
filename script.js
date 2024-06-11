const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// HERE WE ARE READ DIRECTORY
app.get('/', function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        res.render('script', { files: files })
    })
})

// FILE THAT SEND DATA TO TITLE AND DETAILS in  show page
app.get('/files/:fileName', function (req, res) {
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", function (err, filedata) {
        res.render('show', { fileName: req.params.fileName, filedata: filedata })

    })
})

// WRITING A FILE data and file name
app.post('/create', function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
        res.redirect('/')
    })
})

// reading filedata to edit in "edit file"
app.get('/edit/:editfile', function (req, res) {
    res.render('edit', { editfile: req.params.editfile })
})


// save changing file rename
app.post('/edit', function (req, res) {
    fs.rename(`./files/${req.body.prev}`, `./files/${req.body.new}`, function (err) {
        res.redirect("/")
    })


})

app.listen(3000);
