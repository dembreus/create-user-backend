import {send, json} from 'micro'
import {router, get, post, put, del} from 'microrouter'
import Users from './db/users'
const cors = require("micro-cors")();
export default cors(router(
    get('/', async (req, res) => {
        const results = await Users.find({});
        await send(res, 200, results)
    }),
    get('/:id', async (req, res) => {
        const _id = req.params.id;
        const user = await Users.findOne({ _id });

        if(!user) {
            return send(res, 404, { message: `Figure not found ${_id}`})
        }
        return send(res, 200, user)
    }),
    post('/', async (req, res) => {
        const user = await json(req);
        const result = await Users.insert(user);
        return send(res, 201, result)
    }),
    del('/:id', async (req, res) => {
        const id = req.params.id;
        const deleted = await Users.remove({_id: id});
        console.log(deleted);
        return send(res, 200, {})
    })
))