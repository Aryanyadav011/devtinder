# DevTinder APIs

## authRouter:
POST /signup
POST /login
POST /logout

## profileRouter:
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

## connectionRequestRouter:
POST /request/send/interested/:userId
POST /request/send/ibnored/:userId
POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

## userRouter
GET /user/connection
GET /user/request/received
GET /user/feed - Gets you the profiles of other users on platform

Status: ignore,interested, accepted, rejected