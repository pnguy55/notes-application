let fs = require('fs')
let chalk = require('chalk')

let getNotes = () => {
    let notes = loadNotes()
    let noteNumber = 0
    console.log('\n')

    notes.forEach((note) => {
        noteNumber++
        console.log(chalk.bgWhite.black(' NOTE ' + noteNumber + ' '))
        console.log(chalk.bgWhite.black(' ' + note.title + ' '))
        console.log(chalk.bgWhite.black(' ' + note.body + ' '))
        console.log('\n')
    })
}

const addNote = (title, body) => {
    let notes = loadNotes()
    let duplicateNotes = notes.find((note) => note.title === title)

    if (!duplicateNotes) {
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

const removeNote = (title) => {
    let notes = loadNotes()
    let initialLength = notes.length
    let filteredNotes = notes.filter((note) => note.title != title)
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

const readNote = (title) => {
    let notes = loadNotes()
    let noteNumber = 0
    let foundNote = notes.find((note) => {
        noteNumber++
        return note.title === title
    })

    if(!foundNote){
        console.log(chalk.red('No note with that title found.'))
    } else {
        console.log('\n')
        console.log(chalk.bgWhite.black(' NOTE ' + noteNumber + ' ' ))
        console.log(chalk.bgWhite.black(' ' + foundNote.title + ' '))
        console.log(chalk.bgWhite.black(' ' + foundNote.body + ' '))
        console.log('\n')
    }
}

const saveNotes = (notes) => {
    let noteString = JSON.stringify(notes) 
    fs.writeFileSync('notes.json', noteString)
}

const loadNotes = () => {
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
    removeNote: removeNote,
    readNote: readNote
}