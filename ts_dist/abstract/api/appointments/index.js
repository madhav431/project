"use strict";
/* eslint-disable */
// tslint:disable
/**
 * Hospital Management Service
 *
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator+.
 * https://github.com/karlvr/openapi-generator-plus
 * Do not edit the class manually.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const v = __importStar(require("../../validation"));
function default_1(app, impl) {
    app.post('/appointment', function (req, res) {
        try {
            function __body() {
                const __contentType = req.get('Content-Type');
                const __mimeType = __contentType ? __contentType.replace(/;.*/, '') : undefined;
                if (__mimeType === 'application/json') {
                    return v.modelApiCreateAppointmentFromJson('body', req.body);
                }
                console.error(`Invalid request content type: ${__contentType}`);
                throw new Error(`Invalid request content type: ${__contentType}`);
            }
            impl.createAppointment(__body()).then(function (response) {
                if (response.status === 201) {
                    let body;
                    try {
                        body = v.modelApiCreateAppointment201ResponseToJson('response', response.body);
                    }
                    catch (error) {
                        console.error('Invalid response body in appointments.createAppointment', error);
                        res.status(500);
                        res.send();
                        return;
                    }
                    res.status(201);
                    res.send(body);
                    return;
                }
                if (response.status === 404) {
                    let body;
                    try {
                        body = v.modelApiCreateAppointment404ResponseToJson('response', response.body);
                    }
                    catch (error) {
                        console.error('Invalid response body in appointments.createAppointment', error);
                        res.status(500);
                        res.send();
                        return;
                    }
                    res.status(404);
                    res.send(body);
                    return;
                }
                if (response.status === 500) {
                    let body;
                    try {
                        body = v.modelApiCreateAppointment500ResponseToJson('response', response.body);
                    }
                    catch (error) {
                        console.error('Invalid response body in appointments.createAppointment', error);
                        res.status(500);
                        res.send();
                        return;
                    }
                    res.status(500);
                    res.send(body);
                    return;
                }
                console.log('Unsupported response in appointments.createAppointment', response);
                res.status(500);
                res.send();
            }).catch(function (error) {
                console.error('Unexpected error in appointments.createAppointment', error.stack || error);
                res.status(500);
                res.send();
            });
        }
        catch (error) {
            /* Catch validation errors */
            res.status(400);
            res.send(error);
        }
    });
}
exports.default = default_1;