let fs = require('fs')
let chalk = require('chalk')

let getNotes = function (){
    let notes = loadNotes()
    let noteNumber = 0
    console.log(chalk.bgWhite.white('--------------------------------------'))

    notes.forEach(function(note) {
        noteNumber++
        console.log(chalk.bgWhite.black(' NOTE ' + noteNumber + ' '))
        console.log(chalk.green(note.title))
        console.log(chalk.green(note.body))
        console.log(chalk.bgWhite.white('--------------------------------------'))
    })
}

const addNote = function (title, body){
    let notes = loadNotes()
    let duplicateNotes = notes.filter(function (note){
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.blue('\n-------------------------------'));
        console.log(chalk.blue('Title:' + title));
        console.log(chalk.blue('Body:' + body));
        console.log(chalk.blue('-------------------------------\n'));
        
        saveNotes(notes)
        console.log(chalk.bgBlue('New note added'))
    } else {
        console.log(chalk.red('\n-------------------------------'));
        console.log(chalk.red('Title:' + title));
        console.log(chalk.red('Body:' + body));
        console.log(chalk.red('-------------------------------\n'));
        
        console.log(chalk.bgRed('Note title taken'))
    }
}

const removeNote = function (title){
    let notes = loadNotes()
    let initialLength = notes.length
    let filteredNotes = notes.filter(function (note) {
        return note.title != title
    })
    let filteredLength = filteredNotes.length

    saveNotes(filteredNotes)

    if (initialLength === 0) {
        console.log(chalk.bgRed('There is no note to remove'))
    } else if (initialLength === filteredLength) {
        console.log(chalk.bgRed('The note you requested to remove does not exist'))
    } else {
        console.log(chalk.bgRed('Your note was successfully removed'))
    }
}

const saveNotes = function (notes){
    let noteString = JSON.stringify(notes) 
    fs.writeFileSync('notes.json', noteString)
}

const loadNotes = function () {
    try{
        let noteBuffer = fs.readFileSync('notes.json')
        let noteString = noteBuffer.toString()
        return JSON.parse(noteString)
    } catch (e) {
        return []
    }
    


}

module.exports = {
    getNotes: getNotes, 
    addNote: addNote,
    removeNote: removeNote
}