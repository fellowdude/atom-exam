

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
//import * as bodyParser from 'body-parser'
import { Routes } from './routes/Routes'
import * as cors from 'cors'

const firebaseConfig = {
    type: "service_account",
    project_id: "atom-test-321d2",
    private_key_id: "ee74b4b537739572116928f7be218f00eb9c1894",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLQKWxFs+NuFLx\nBO/NGj78Kxttvtl12bCsyBILSIIZosRMZgNcp7uNcR2H4LMta8ic4mi/crNo+uU+\n2qZ/Z9Y0soJv2188ske9xshh56IsZ6RC5M61/LRY1KyL8ZkNFPoKYi7SKydJIY5/\nlE1BEUl+DKgTVu1FippqOwX457ti8GeJO3s9TicRb5Z58yvAtOm2f7shdVVhuRTp\nzDxRaRV0cTLwci/EhYYNtwjXcatCDmxSN4cQRyoSSPXJ+StK/SZQQSa4On7rrQX8\nh7j88o009Uk1wViFcNVHk4wtsYO96YfgqJUbr55vDdafblXNnjldyPWzHmCE07gG\nH50fRDVFAgMBAAECggEACzcYvXYRA1SrrPV1Bvf/CDqXs51PkgduToZmqn04gpIe\n60lIv7TYrkQS2VPOhz/WjMOYfJHncPBBNI/rloWkBfngpSvxbB+5QjFFDtPxeKpK\nX8+Q0W1thSZNFBbDd3uUFX0X8MxlSU2C96q2/ZNm3v/zSUfnZUox3ZE+sd6Vki6x\nEocpRQi0cCnQ1GemZ8VLJlXwqHV16R/TB0DGuhMSFgbn1slrULGm6CFH5tRZUldm\n9W9CTZlY+rLo+0bh8ZGjmRAfAC4UjiGeS3njGW3GK5R1CmBhAaa/eGlNYPeUTi6M\nOZmq5Uh6xQtTjaOIb744LpcmzvcTzYG5+aYfYh7OUQKBgQDtJgCBnuHCZ6R5XP9m\niM2yIU3fZpRuT9OpV4/kzN57HnULqYKf7bwqLdMXbj0WezTo/xbX5XGTznXvowWa\n2TwxH6AF25cAp6sbU97jQ9aCN+AJB3uwNP2kOsu1YARBl2hcuSJpcf3gSpGaZoyY\nBVosKCThVi0K2qkuOpGHmD+akQKBgQDbaNwFw3L/GrkvriWslqlMPqnVMF3OTfbA\n2hXVKmcW7BBNmNvW1b6k//+w6XrLspHZxdR6XerfOuULoBFVjJh4jA8UsyYoZfCT\n8z5FQCK+UGDCUzsisWqZeVH34SE2oNfA1Spsy2rpe6P+2S7mGKN7403u8QLoSSl1\nwJNNfRgBdQKBgQDiG7ej3u71wofpRygkhQ9KZcKv3EhtnSL8dQY3arY9wV5rziVD\ngxJDTQnVb0BDbRmXhZAsLRHLkbCU2WSArdtcIwEaVLJ252aXWbJMEeQ2qDutoDro\nWL31ljGgL3ofZ9MThVkwHIWpErAc/OXUFFZTf7saNmYf0Tg5YZJcLGeIYQKBgQCl\nPo4m0RK0yp2aKWA6YaXTxIYIB8s+az1h9V3oE21cuCF3L56yaHySrDMYPF+9Nhne\nl731AvK3eRWz8bPcaG0UrPdWsa4VUuEjrFjDsw/3oXWeJS0ubcxJFjQDqkxnZi/Y\nDTNMiM9WVUYn084cgYXu8jxprp5v71oIUycdfw8rWQKBgQCGXFkFqv4rYCTchDeG\nfBONqKyjPOftk22wwxYP7RyFsi+D1h0XkUkUIHavYpbWIhRLvjkIpab3ylS4mGDJ\nRy3pKfHRoXmUf/j8CUqvxffz7JBvtECCUSPG9d8xHPc6wCwiU55MD1Cnd/w9Zl/J\nvDVVDNU0zX/NcyeI1uqCEeJP8Q==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-wibs4@atom-test-321d2.iam.gserviceaccount.com",
    client_id: "101000412132901441203",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wibs4%40atom-test-321d2.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
    
}
class Api { 
  public api: express.Application
  public app: express.Application
  public routes: Routes 

  constructor () {
    this.firebaseSetup()
    this.app = express()
    this.api = express()
    this.config()
    this.routes = new Routes(this.app)
  }

  private config(): void {
    this.app.use(cors())
    this.api.use('/api/v1', this.app)
    //this.api.use(bodyParser.json())
    //this.api.use(bodyParser.urlencoded({ extended: false }))
  }

  private firebaseSetup (): void {
    admin.initializeApp({ credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount), databaseURL: "https://atom-test-321d2-default-rtdb.firebaseio.com/", })
    admin.firestore().settings({ timestampsInSnapshots: true })
  }
}

export const API = functions.https.onRequest(new Api().api)