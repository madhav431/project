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
import users from './api/users'
import * as t from './types'

export default function(app: Express, impl: t.ApiImplementation) {
	users(app, impl.users)
}