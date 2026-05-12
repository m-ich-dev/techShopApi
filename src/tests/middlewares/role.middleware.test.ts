import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Request, Response } from 'express';
import roleMiddleware from '@/middlewares/auth/role.middleware.js';
import HTTPError from '@/boot/http/http.error.js';


describe('Role middleware', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should call next for valid user role', () => {
        const req = {
            user: {
                userId: '1',
                role: 1
            }
        } as Request;
        const res = {} as Response;
        const next = vi.fn();

        const roleMware = roleMiddleware([1, 0]);

        roleMware(req, res, next);

        expect(next).toHaveBeenCalledWith();
    });

    it('should throw forbidden error for low access role', () => {
        const req = {
            user: {
                userId: '1',
                role: 2
            }
        } as Request;
        const res = {} as Response;
        const next = vi.fn();

        const roleMware = roleMiddleware([1, 0]);

        expect(() => roleMware(req, res, next))
            .rejects
            .toThrow(HTTPError.forbidden({
                message: 'Access denied'
            }));

        expect(next).not.toHaveBeenCalled();
    });

    it('should throw error for invalid request payload', () => {
        const req = {} as Request;
        const res = {} as Response;
        const next = vi.fn();

        const roleMware = roleMiddleware([1, 0]);

        expect(() => roleMware(req, res, next))
            .rejects
            .toThrow(HTTPError.unauthorized({
                message: 'Authentication failure'
            }));

        expect(next).not.toHaveBeenCalled();
    });
});