import dotenv from 'dotenv'

dotenv.config();

export const DBConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'project-z'

}


export const ServerConfig = {
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV
}

export const JwtSecret = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
}