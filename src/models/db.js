import 'dotenv/config'

console.log(process.env.SERVER)

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
    }
}

export default config;
