import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import bcrypt from "bcrypt";
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { InvalidCredentialsError } from "../errors/http/InvalidCredentialsError";
import { UnauthenticatedError } from "../errors/http/UnauthenticatedError";
import { MissingProprietiesError } from "../errors/http/MissingProprietiesError";
import { RegistrationToken } from "../index";
import { AccessForbiddenError } from "../errors/http/AccessForbiddenError";
import {envConfig} from "../config/config";
import {AppDataSource} from "../database/database-source";

const userRepository = AppDataSource.getRepository(User)
export const Register = async (req: Request, res: Response) => {
    const { name, email, password, registrationCode } = req.body;

    if (!name || !email || !password || !registrationCode) {
        throw new MissingProprietiesError("Missing register properties.")
    }

    let user: User | null;

    user = await userRepository.findOneBy({
        email: email
    })

    if (!RegistrationToken.includes(registrationCode)) {
        throw new AccessForbiddenError("Bad registration token.")
    }

    if (user) throw new UnauthenticatedError("User already exists.")

    user = await userRepository.save({
        name,
        email,
        password: await bcrypt.hash(password, 12)
    })

    res.send(user);
}

export const Login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await userRepository.findOne({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new InvalidCredentialsError("Wrong password or id.")
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw new InvalidCredentialsError("Wrong password or id.")
    }

    const accessToken = sign({
        id: user.id
    }, envConfig.SECRET_KEY, { expiresIn: 24 * 60 * 60 * 1000 });

    const refreshToken = sign({
        id: user.id
    }, envConfig.SECRET_KEY, { expiresIn: 24 * 60 * 60 })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //equivalent to 1 day
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 //equivalent to 7 days
    })

    res.send({
        "id": user.id,
        "email": user.email,
        "name": user.name,
        accessToken
    });
}

export const AuthenticatedUser = async (req: Request, res: Response): Promise<void> => {

    // let payload: JwtPayload | undefined = undefined;
    // const {accessToken} = req.body;
    //
    // try {
    //     payload = verify(accessToken, "access_secret") as JwtPayload;
    // } catch (error) {
    //     throw new UnauthenticatedError("Error while getting the payload.")
    // }
    //
    // if (!payload) {
    //     throw new UnauthenticatedError("Payload is null.")
    // }
    //
    // const user = await userRepository.findOne({
    //     where: {
    //         id: payload.id
    //     }
    // });
    //
    // if (!user) {
    //     throw new UnauthenticatedError("User doesn't exist.")
    //
    // }
    //
    // const {password, ...data} = user;

    res.send(200);


}
export const Refresh = async (req: Request, res: Response): Promise<Response<Record<any, string>> | undefined> => {
    try {
        const refreshToken = req.cookies['refreshToken'];

        const payload: any = verify(refreshToken, envConfig.SECRET_KEY);

        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const accessToken = sign({
            id: payload.id,
        }, envConfig.SECRET_KEY, { expiresIn: 60 * 60 })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //equivalent to 1 day
        });

        res.send({
            message: 'success'
        })

    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('accessToken', '', { maxAge: 0 });
    res.cookie('refreshToken', '', { maxAge: 0 });
}