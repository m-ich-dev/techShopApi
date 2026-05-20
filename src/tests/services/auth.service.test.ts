import HTTPError from '@/boot/http/http.error.js';
import { verify } from '@/boot/utils/argon2.js';
import AuthService from '@/services/auth.service.js';
import { afterEach, describe, expect, it, vi } from 'vitest';


vi.mock('@/boot/utils/argon2.js');

describe('Auth service', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    const userRepository = {
        firstByEmail: vi.fn(),
        insert: vi.fn(),
        update: vi.fn(),
        first: vi.fn()
    } as any;

    const tokenRepository = {
        insert: vi.fn(),
        firstByHash: vi.fn(),
        revoke: vi.fn(),
        revokeAllByUser: vi.fn()
    } as any;

    const jwtService = {
        generateAccesToken: vi.fn()
    } as any;

    const authService = new AuthService(userRepository, tokenRepository, jwtService);

    describe('auth login', () => {

        it('should return tokens and user on success', async () => {
            userRepository.firstByEmail.mockResolvedValue({
                password: 'hashedPass'
            });
            vi.mocked(verify).mockResolvedValue(true);

            jwtService.generateAccesToken.mockResolvedValue('access-token');
            const result = await authService.login({
                email: 'test@test.com',
                password: '123'
            });

            expect(result.tokens.accessToken).toBe('access-token');
            expect(result.tokens.refreshToken).toBeDefined();
            expect(tokenRepository.insert).toHaveBeenCalled();
        });

        it('should return unauthorized error for invalid user', async () => {
            userRepository.firstByEmail.mockResolvedValue(null);

            await expect(authService.login({
                email: 'mocked@gmail.com',
                password: 'pass'
            }))
                .rejects
                .toThrow(HTTPError.unauthorized({
                    message: 'Invalid credentials',
                    detail: { path: 'credentials', message: 'email or password' }
                }));
        });

        it('should return forbidden error for unactive user', async () => {
            userRepository.firstByEmail.mockResolvedValue({
                isActive: false
            });

            await expect(authService.login({
                email: 'mocked@gmail.com',
                password: 'pass'
            }))
                .rejects
                .toThrow(HTTPError.forbidden({
                    message: 'User is disabled',
                    detail: { path: 'email', message: 'mocked@gmail.com' }
                }));
        });

        it('should return unauthorized error for invalid password', async () => {
            userRepository.firstByEmail.mockResolvedValue({
                id: 12,
                passwrod: 'hashedPass',

            });
            vi.mocked(verify).mockResolvedValue(false);
            await expect(authService.login({
                email: 'mocked@gmail.com',
                password: 'pass'
            }))
                .rejects
                .toThrow(HTTPError.unauthorized({
                    message: 'Invalid credentials',
                    detail: { path: 'credentials', message: 'email or password' }
                }));;
        });

    });

    describe('auth register', () => {
        it('should throw conflict if user exists', async () => {
            userRepository.firstByEmail.mockResolvedValue({
                id: '1',
                deletedAt: null
            });

            await expect(
                authService.register({
                    firstName: 'test',
                    lastName: 'test',
                    email: 'mocked@gmail.com',
                    password: '123'
                })
            ).rejects.toThrow(HTTPError.conflict({
                message: 'Email already exists',
                detail: { path: 'email', message: 'mocked@gmail.com' }
            }));
        });

        it('should create new user', async () => {
            userRepository.firstByEmail.mockResolvedValue(null);
            userRepository.insert.mockResolvedValue({
                id: '1',
                role: 2
            });

            jwtService.generateAccesToken.mockResolvedValue('access');

            const result = await authService.register({
                firstName: 'test',
                lastName: 'test',
                email: 'mocked@gmail.com',
                password: '123'
            });

            expect(result.tokens.accessToken).toBe('access');
            expect(userRepository.insert).toHaveBeenCalled();
        });
    });

    describe('auth refresh', () => {

        it('should throw if token not found', async () => {
            tokenRepository.firstByHash.mockResolvedValue(null);

            await expect(
                authService.refresh('token')
            ).rejects.toThrow();
        });

        it('should throw if token expired', async () => {
            tokenRepository.firstByHash.mockResolvedValue({
                expiredAt: new Date(Date.now() - 1000),
                revokedAt: null
            });

            await expect(
                authService.refresh('token')
            ).rejects.toThrow();
        });

        it('should detect reuse and logout all', async () => {
            tokenRepository.firstByHash.mockResolvedValue({
                revokedAt: new Date(),
                userId: '1'
            });

            await expect(
                authService.refresh('token')
            ).rejects.toThrow();

            expect(tokenRepository.revokeAllByUser).toHaveBeenCalledWith({ userId: '1' });
        });

        it('should refresh successfully', async () => {
            tokenRepository.firstByHash.mockResolvedValue({
                id: 1,
                userId: '1',
                expiredAt: new Date(Date.now() + 10000),
                revokedAt: null
            });

            userRepository.first.mockResolvedValue({
                id: '1',
                role: 1
            });

            jwtService.generateAccesToken.mockResolvedValue('access');

            const result = await authService.refresh('token');

            expect(result.tokens.accessToken).toBe('access');
            expect(tokenRepository.revoke).toHaveBeenCalled();
        });

    });

    describe('auth logout', () => {

    it('should revoke token if exists', async () => {
        tokenRepository.firstByHash.mockResolvedValue({ id: 1 });

        await authService.logout('token');

        expect(tokenRepository.revoke).toHaveBeenCalledWith({ tokenId: 1 });
    });

    it('should do nothing if token not found', async () => {
        tokenRepository.firstByHash.mockResolvedValue(null);

        const result = await authService.logout('token');

        expect(result).toBe(true);
    });

});
});