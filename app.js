const chalk = require('./node_modules/chalk');
let yargs = require('./node_modules/yargs');
let notes = require('./notes.js');

yargs.command({
    command: 'add',
    describe: chalk.blue('Add a new note'),
    builder: {
        title: {
            describe: chalk.blue('Note title'),
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: chalk.blue('Note body'),
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: chalk.red('Remove a note'),
    builder: {
        title: {
            describe: chalk.red('Note title'),
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: chalk.magenta('List notes'),
    handler() {
        notes.getNotes();
    }
})
yargs.command({
    command: 'read',
    describe: chalk.green('Read a note'),
    builder: {
        title: {
            describe: chalk.red('Note title'),
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()