const assert = require('assert');

const user = require('./user');

describe('user', () => {
    describe('toString', () => {
        it('should print user', () => {
            let bob = new user('Bob', '14.02.1974');

            assert.strictEqual(bob.toString(), 'User [dateOfBirth=14.02.1974, name=Bob, isAdmin=false, subordinates=[], rating=0]');
        });

        it('should print user with subordinates', () => {
            let bob = new user('Bob', '14.02.1974');
            let peter = new user('Peter', '08.06.1983');
            let tom = new user('Tom', '22.05.1981', [peter]);
            let alex = new user('Alex', '19.08.1968', [bob, tom]);

            assert.strictEqual(alex.toString(), 'User [dateOfBirth=19.08.1968, name=Alex, isAdmin=false, subordinates=[User [dateOfBirth=14.02.1974, name=Bob, isAdmin=false, subordinates=[], rating=0], User [dateOfBirth=22.05.1981, name=Tom, isAdmin=false, subordinates=[User [dateOfBirth=08.06.1983, name=Peter, isAdmin=false, subordinates=[], rating=0]], rating=0]], rating=0]');
        });

        it('should print admin user with rating', () => {
            let bob = new user('Bob', '14.02.1974', [], true);
            bob.setRating(33);

            assert.strictEqual(bob.toString(), 'User [dateOfBirth=14.02.1974, name=Bob, isAdmin=true, subordinates=[], rating=33]');
        });
    });
});
