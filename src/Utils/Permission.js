import requester from './Requester';

const permissions = {};

class Permission {

    constructor() {
        requester.get('/Api/Permissions')
    }

    check(target, action) {
        return new Promise((resolve, reject) => {
            if (typeof permissions[target] === 'undefined') {

                return false;
            }
            const permissions = permissions[target];
            return (action & permissions) == action;
        });
    }
}

export default new Permission();