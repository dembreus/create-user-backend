import {send, json} from 'micro'
import {router, get, post, put, del} from 'microrouter'
// import Users from './db/users'
const cors = require("micro-cors")();
const db = require('monk')('mongodb://blue5:5blue5@ds018498.mlab.com:18498/create-user-backend');
const users = db.get('users');

export default cors(router(
    get('/', async (req, res) => {
        const results = await users.find({});
        await send(res, 200, results)
    }),
    get('/:id', async (req, res) => {
        const _id = req.params.id;
        const user = await users.findOne({ _id });

        if(!user) {
            return send(res, 404, { message: `Figure not found ${_id}`})
        }
        return send(res, 200, user)
    }),
    post('/', async (req, res) => {
        const user = await json(req);
        const result = await users.insert(user);
        return send(res, 201, result)
    }),
    del('/:id', async (req, res) => {
        const id = req.params.id;
        const deleted = await users.remove({_id: id});
        const find = await users.find({});
        console.log(deleted);
        console.log(find);
        return send(res, 200, {})
    })
))