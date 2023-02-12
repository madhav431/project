# Users

## Operations

### createUser

```http
POST /users/patient
```

To create User account

## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function createUser(request: Api.CreateUser | undefined): Promise<t.CreateUserResponse> {
	throw 'Unimplemented'
}


const api: t.UsersApi = {
	createUser,
}

export default api
```
