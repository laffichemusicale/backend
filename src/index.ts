import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import {routes} from './routes';
import {errorHandler} from "./middleware/ErrorHandler";
import validatorHandler from "./middleware/ValidatorHandler";
import {AppDataSource} from "./database/database-source";
import {envConfig} from "./config/config";

export const RegistrationToken: string[] = ["Laffichemusicale2023"]

AppDataSource.initialize()
    .then(async () => {
        console.log("Database connection success");

        const app = express();

        app.use(express.json());
        app.use(cookieParser());
        app.use(cors({
            origin: ['https://laffichemusicale.wailroth.fr', 'http://localhost:3000',],
            credentials: true
        }));

        //app.use(authHandler);
        app.use(validatorHandler)
        routes(app);
        app.use(errorHandler)

        app.listen(envConfig.BACKEND_PORT, () => {
            console.log('Listening to port 8000');
        })
    })
    .catch((err) => {
        throw err;
    });


