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

export namespace Api {
	export interface CreateAppointment {
		patient_id?: string;
		doctor_id?: string;
		appointment_date?: string;
		appointment_time?: string;
	}

	export interface CreateAppointment201Response {
		message?: string;
	}

	export interface CreateAppointment404Response {
		message?: string;
	}

	export interface CreateAppointment500Response {
		message?: string;
	}

	export interface CreateDoctor {
		name?: string;
		email?: string;
		password?: string;
		address?: string;
		mobile?: string;
		specialization?: string;
	}

	export interface CreateDoctor201Response {
		message?: string;
	}

	export interface CreateDoctor404Response {
		message?: string;
	}

	export interface CreateUser {
		name?: string;
		email?: string;
		password?: string;
		gender?: string;
		mobile?: string;
		address?: string;
		/**
		 * @type {number}
		 * @memberof CreateUser
		 */
		age?: number;
		medical_history?: string;
	}

	export interface CreateUser201Response {
		message?: string;
	}

	export interface CreateUser404Response {
		message?: string;
	}

	export interface DoctorSign200Response {
		id?: string;
		email?: string;
		name?: string;
		mobile?: string;
		specialization?: string;
	}

	export interface DoctorSign404Response {
		message?: string;
	}

	export interface DoctorSign500Response {
	}

	export interface DoctorSignRequest {
		email?: string;
		password?: string;
	}

	export interface GetProfile200Response {
		name?: string;
		email?: string;
		gender?: string;
		mobile?: string;
		address?: string;
		/**
		 * @type {number}
		 * @memberof GetProfile200Response
		 */
		age?: number;
		medical_history?: string;
	}

	export interface GetProfile404Response {
		message?: string;
	}

	export interface SignIn200Response {
		email?: string;
		id?: string;
		token?: string;
	}

	export interface SignIn404Response {
		message?: string;
	}

	export interface SignIn500Response {
		message?: string;
	}

	export interface SignInRequest {
		email?: string;
		password?: string;
	}

	export interface Updatepatient200Response {
		message?: string;
	}

	export interface Updatepatient404Response {
		message?: string;
	}

}
