import {NextFunction, Request, Response} from "express";
import {UnauthenticatedError} from "../errors/http/UnauthenticatedError";
import {JwtPayload, verify} from "jsonwebtoken";
import {envConfig} from "../config/config";


export const authHandler = (request: Request, response: Response, next: NextFunction) => {


    const token: string | undefined = request.headers.authorization?.replace("Bearer ", "");
    let payload: JwtPayload | undefined = undefined;

    if (!token) {
        throw new UnauthenticatedError("Authorization is missing.");
    }
    try {
        payload = verify(token, envConfig.SECRET_KEY) as JwtPayload;
        next();
    } catch (e) {
        throw new UnauthenticatedError("Authorization is invalid.");
    }
}