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
import passport from 'passport'
import * as t from './types'
import * as v from '../../validation'
import { Api } from '../../models'

export default function(app: Express, impl: t.DoctorApi) {
	app.post(
		'/doctor',
		function (req, res) {
			try {
				function __body() {
					const __contentType = req.get('Content-Type')
					const __mimeType = __contentType ? __contentType.replace(/;.*/, '') : undefined

					if (__mimeType === 'application/json') {
						return v.modelApiCreateDoctorFromJson('body', req.body)
					}
					console.error(`Invalid request content type: ${__contentType}`)
					throw new Error(`Invalid request content type: ${__contentType}`)
				}

				impl.createDoctor(__body()).then(function (response) {
					if (response.status === 201) {
						let body: any
						try {
							body = v.modelApiCreateDoctor201ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in doctor.createDoctor', error)
							res.status(500)
							res.send()
							return
						}

						res.status(201)
						res.send(body)
						return
					}
					if (response.status === 404) {
						let body: any
						try {
							body = v.modelApiCreateDoctor404ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in doctor.createDoctor', error)
							res.status(500)
							res.send()
							return
						}

						res.status(404)
						res.send(body)
						return
					}

					console.log('Unsupported response in doctor.createDoctor', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in doctor.createDoctor', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

	app.post(
		'/doctor/signin',
		function (req, res) {
			try {
				function __body() {
					const __contentType = req.get('Content-Type')
					const __mimeType = __contentType ? __contentType.replace(/;.*/, '') : undefined

					if (__mimeType === 'application/json') {
						return v.modelApiDoctorSignRequestFromJson('body', req.body)
					}
					console.error(`Invalid request content type: ${__contentType}`)
					throw new Error(`Invalid request content type: ${__contentType}`)
				}

				impl.doctorSign(__body()).then(function (response) {
					if (response.status === 200) {
						let body: any
						try {
							body = v.modelApiDoctorSign200ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in doctor.doctorSign', error)
							res.status(500)
							res.send()
							return
						}

						res.status(200)
						res.send(body)
						return
					}
					if (response.status === 404) {
						let body: any
						try {
							body = v.modelApiDoctorSign404ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in doctor.doctorSign', error)
							res.status(500)
							res.send()
							return
						}

						res.status(404)
						res.send(body)
						return
					}
					if (response.status === 500) {
						let body: any
						try {
							body = v.modelApiDoctorSign500ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in doctor.doctorSign', error)
							res.status(500)
							res.send()
							return
						}

						res.status(500)
						res.send(body)
						return
					}

					console.log('Unsupported response in doctor.doctorSign', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in doctor.doctorSign', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

	app.get(
		'/users/getdata',
		function (req, res) {
			try {
				impl.getDoctor(v.allowUndefined(v.parseString)('query.id', req.query['id'])).then(function (response) {
					if (response.status === 200) {
						let body: any
						try {
							body = v.modelApiGetDoctorDataToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in doctor.getDoctor', error)
							res.status(500)
							res.send()
							return
						}

						res.status(200)
						res.send(body)
						return
					}
					if (response.status === 404) {
						let body: any
						try {
							body = v.modelApiGetDoctor404ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in doctor.getDoctor', error)
							res.status(500)
							res.send()
							return
						}

						res.status(404)
						res.send(body)
						return
					}
					if (response.status === 500) {
						let body: any
						try {
							body = v.modelApiGetDoctor500ResponseToJson('response', response.body)
						} catch (error) {
							console.error('Invalid response body in doctor.getDoctor', error)
							res.status(500)
							res.send()
							return
						}

						res.status(500)
						res.send(body)
						return
					}

					console.log('Unsupported response in doctor.getDoctor', response)
					res.status(500)
					res.send()
				}).catch(function (error) {
					console.error('Unexpected error in doctor.getDoctor', error.stack || error)
					res.status(500)
					res.send()
				})
			} catch (error) {
				/* Catch validation errors */
				res.status(400)
				res.send(error)
			}
		}
	)

}
