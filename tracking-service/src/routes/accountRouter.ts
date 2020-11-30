import { IAccount } from "../models/account.model";
import express, { Request, Response } from "express";
import Account from "../models/account.model";
import io from 'socket.io-client';
import config from '../config.json';

const router = express.Router();
const socket: SocketIOClient.Socket = io(config['socket-server']);

interface Message {
    id: number,
    data: string,
    timestamp: string
}

/**
 * Router for /api/account/id, if account is active it is emitted to pub-sub-service.
 */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const account: IAccount | null = await Account.findOne({ accountId: parseInt(req.params.id) });
        if (account && account.isActive == true) {
            const message: Message = {
                id: account.accountId,
                data: String(req.query.data),
                timestamp: String(new Date())
            }
            socket.emit('pub-sub-service', JSON.stringify(message))
            console.log(JSON.stringify(message))
            res.status(200).json(message)
        }
        else {
            res.json('inactive account or no data ')
            console.log('inactive account or no data ')
        }
    } catch (err) {
        res.status(400).json(err)
        console.log('bad request')
    }
});

export default router;
