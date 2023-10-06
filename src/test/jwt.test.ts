import { generateAccessToken, generateRefreshToken } from "../util/jwt"

describe('Generate jwt access token', () => {
    it('should generate jwt access token', () => {
        const payload = {}
        const accessToken = generateAccessToken(payload)

        expect(typeof accessToken).toBe('string')
        expect(accessToken.length).toBeGreaterThan(0)
    })
})

describe('Generate jwt refresh token', () => {
    it('should generate jwt refresh token', () => {
        const payload = {}
        const refreshToken = generateRefreshToken(payload)

        expect(typeof refreshToken).toBe('string')
        expect(refreshToken.length).toBeGreaterThan(0)
    })
})