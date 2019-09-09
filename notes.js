let fs = require('fs')
let chalk = require('chalk')

let getNotes = function (){
    return 'Your notes...';
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
    addNote: addNote
}