import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Response, Request } from 'express';
import { JwtService } from '@/boot/container.js';
import HTTPError from '@/boot/http/http.error.js';
import authMiddleware from '@/middlewares/auth/auth.middleware.js';


describe('Auth middleware', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return verify payload for valid access token', async () => {
        const req = {
            headers: {
                authorization: 'Bearer token'
            }
        } as Request;
        const res = {} as Response;
        const next = vi.fn();

        vi.spyOn(JwtService, 'verifyAccessToken')
            .mockResolvedValue({
                userId: '1',
                role: 1
            });
        await authMiddleware(req, res, next);
        expect(req.user).toEqual({
            userId: '1',
            role: 1
        });

        expect(next).toHaveBeenCalledWith();
    });

    it('should throw error for invalid jwt', async () => {
        const req = {
            headers: {
                authorization: 'Bearer token'
            }
        } as Request;
        const res = {} as Response;
        const next = vi.fn();

        vi.spyOn(JwtService, 'verifyAccessToken')
            .mockRejectedValue(new Error('Authentication failure'));

        await expect(authMiddleware(req, res, next))
            .rejects.toThrow(new Error('Authentication failure'));

        expect(next).not.toHaveBeenCalled();
    });

    it('should throw error for invalid auth header format', async () => {
        const req = {
            headers: {
                authorization: 'token'
            }
        } as Request;
        const res = {} as Response;
        const next = vi.fn();

        await expect(authMiddleware(req, res, next))
            .rejects.toBeInstanceOf(HTTPError);

        expect(next).not.toHaveBeenCalled();
    });
});