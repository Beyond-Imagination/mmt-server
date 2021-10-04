import { Strategy } from 'passport-accesstoken'

import Account from '@/models/account'

let strategyOptions = {
    tokenHeader:    'Authorization',    
};

export default new Strategy(strategyOptions,
    function (token, done) {
        if(!token.startsWith("Bearer ")){
            return done(null, false);
        }
        token = token.split(" ")[1];
        Account.findOne({accessToken: token}).populate('nft').exec(function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
