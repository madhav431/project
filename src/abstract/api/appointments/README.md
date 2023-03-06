# Appointments

## Operations

### createAppointment

```http
POST /appointment
```

Schedule appointment

## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function createAppointment(request: Api.CreateAppointment | undefined): Promise<t.CreateAppointmentResponse> {
	throw 'Unimplemented'
}


const api: t.AppointmentsApi = {
	createAppointment,
}

export default api
```
