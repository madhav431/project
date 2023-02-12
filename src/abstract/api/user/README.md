# User

## Operations

### getProfile

```http
GET /user/patient_profile
```

Get the patient profile data

### updatepatient

```http
PUT /user/update_patient
```

Update User data

### signIn

```http
POST /users/patient_signin
```

For SignIn user to the DB

## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function getProfile(id: string | undefined): Promise<t.GetProfileResponse> {
	throw 'Unimplemented'
}

async function updatepatient(id: string | undefined): Promise<t.UpdatepatientResponse> {
	throw 'Unimplemented'
}

async function signIn(request: Api.SignInRequest | undefined): Promise<t.SignInResponse> {
	throw 'Unimplemented'
}


const api: t.UserApi = {
	getProfile,
	updatepatient,
	signIn,
}

export default api
```
