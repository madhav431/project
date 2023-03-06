# Doctor

## Operations

### createDoctor

```http
POST /doctor
```

Create doctor

### doctorSign

```http
POST /doctor/signin
```

For patient signin

## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function createDoctor(request: Api.CreateDoctor | undefined): Promise<t.CreateDoctorResponse> {
	throw 'Unimplemented'
}

async function doctorSign(request: Api.DoctorSignRequest | undefined): Promise<t.DoctorSignResponse> {
	throw 'Unimplemented'
}


const api: t.DoctorApi = {
	createDoctor,
	doctorSign,
}

export default api
```
