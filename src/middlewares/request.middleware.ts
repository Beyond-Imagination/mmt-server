import camelcase from 'camelcase-keys'

export function camelBody(req, res, next) {
    req.body = camelcase(req.body);
    next();
}