import * as jwt from "../util/jwt"

describe('Generate jwt access token', () => {
    it('should generate jwt access token', () => {
        const payload = {}
        
        jest.spyOn(jwt, 'generateAccessToken').mockReturnValue('jwt-token')
        
        const accessToken = jwt.generateAccessToken(payload)

        expect(typeof accessToken).toBe('string')
        expect(accessToken.length).toBeGreaterThan(0)
    })
})

describe('Generate jwt refresh token', () => {
    it('should generate jwt refresh token', () => {
        const payload = {}

        jest.spyOn(jwt, 'generateRefreshToken').mockReturnValue('refresh-token')
        
        const refreshToken = jwt.generateRefreshToken(payload)

        expect(typeof refreshToken).toBe('string')
        expect(refreshToken.length).toBeGreaterThan(0)
    })
})