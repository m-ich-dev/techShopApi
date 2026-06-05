import helmet from 'helmet';

export const appHelmet = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        },
    },
    frameguard: false,
    hidePoweredBy: true,
    dnsPrefetchControl: { allow: false },
    referrerPolicy: { policy: 'same-origin' },
});