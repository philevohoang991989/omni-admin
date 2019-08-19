import requester from '../Utils/Requester';

class AccountsServiceImpl {

    search() {
        return requester.search('/Api/Accounts');
    }

    get(id) {
        return requester.get('/Api/Accounts/' + id);
    }

    create(account) {
        return requester.post('/Api/Accounts', account);
    }

    update(id, account) {
        return requester.put('/Api/Accounts/' + id, account);
    }

    save(account) {
        if (!account.id) {
            return this.create(account);
        } else {
            let id = account.id;
            delete account.id;
            return this.update(id, account);
        }
    }

    delete(id) {
        return requester.delete('/Api/Accounts/' + id);
    }
}

const accountsService = new AccountsServiceImpl();

export default accountsService;