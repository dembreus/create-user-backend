import Datastore from 'nedb-promise'

const db = new Datastore({filename: `${__dirname}/users.db`, autoload: true});
export default db