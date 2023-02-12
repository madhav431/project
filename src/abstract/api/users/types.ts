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

import { Express } from 'express'
import { Api } from '../../models'

export interface UsersApi {
	createUser: (request: Api.CreateUser | undefined) => Promise<CreateUserResponse>
}

export type CreateUserResponse = CreateUser201Response | CreateUser404Response

export interface CreateUser201Response {
	status: 201
	body: Api.CreateUser201Response
	headers?: never
}

export interface CreateUser404Response {
	status: 404
	body: Api.CreateUser404Response
	headers?: never
}

