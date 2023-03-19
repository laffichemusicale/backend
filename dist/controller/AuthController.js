"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Refresh = exports.AuthenticatedUser = exports.Login = exports.Register = void 0;
const user_entity_1 = require("../entity/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const InvalidCredentialsError_1 = require("../errors/http/InvalidCredentialsError");
const UnauthenticatedError_1 = require("../errors/http/UnauthenticatedError");
const MissingProprietiesError_1 = require("../errors/http/MissingProprietiesError");
const index_1 = require("../index");
const AccessForbiddenError_1 = require("../errors/http/AccessForbiddenError");
const config_1 = require("../config/config");
const database_source_1 = require("../database/database-source");
const userRepository = database_source_1.AppDataSource.getRepository(user_entity_1.User);
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, registrationCode } = req.body;
    if (!name || !email || !password || !registrationCode) {
        throw new MissingProprietiesError_1.MissingProprietiesError("Missing register properties.");
    }
    let user;
    user = yield userRepository.findOneBy({
        email: email
    });
    if (!index_1.RegistrationToken.includes(registrationCode)) {
        throw new AccessForbiddenError_1.AccessForbiddenError("Bad registration token.");
    }
    if (user)
        throw new UnauthenticatedError_1.UnauthenticatedError("User already exists.");
    user = yield userRepository.save({
        name,
        email,
        password: yield bcrypt_1.default.hash(password, 12)
    });
    res.send(user);
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userRepository.findOne({
        where: {
            email: email
        }
    });
    if (!user) {
        throw new InvalidCredentialsError_1.InvalidCredentialsError("Wrong password or id.");
    }
    if (!(yield bcrypt_1.default.compare(password, user.password))) {
        throw new InvalidCredentialsError_1.InvalidCredentialsError("Wrong password or id.");
    }
    const accessToken = (0, jsonwebtoken_1.sign)({
        id: user.id
    }, config_1.envConfig.SECRET_KEY, { expiresIn: 24 * 60 * 60 * 1000 });
    const refreshToken = (0, jsonwebtoken_1.sign)({
        id: user.id
    }, config_1.envConfig.SECRET_KEY, { expiresIn: 24 * 60 * 60 });
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //equivalent to 1 day
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 //equivalent to 7 days
    });
    res.send({
        "id": user.id,
        "email": user.email,
        "name": user.name,
        accessToken
    });
});
exports.Login = Login;
const AuthenticatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.AuthenticatedUser = AuthenticatedUser;
const Refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies['refreshToken'];
        const payload = (0, jsonwebtoken_1.verify)(refreshToken, config_1.envConfig.SECRET_KEY);
        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }
        const accessToken = (0, jsonwebtoken_1.sign)({
            id: payload.id,
        }, config_1.envConfig.SECRET_KEY, { expiresIn: 60 * 60 });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //equivalent to 1 day
        });
        res.send({
            message: 'success'
        });
    }
    catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
});
exports.Refresh = Refresh;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('accessToken', '', { maxAge: 0 });
    res.cookie('refreshToken', '', { maxAge: 0 });
});
exports.Logout = Logout;
