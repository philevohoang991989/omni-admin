import requester from '../Utils/Requester';

class RolesServiceImpl {

    search() {
        return requester.search('/Api/Roles');
    }

    get(id) {
        return requester.get('/Api/Roles/' + id);
    }

    create(role) {
        return requester.post('/Api/Roles', role);
    }

    update(id, role) {
        return requester.put('/Api/Roles/' + id, role);
    }

    save(role) {
        if (!role.id) {
            return this.create(role);
        } else {
            let id = role.id;
            delete role.id;
            return this.update(id, role);
        }
    }

    delete(id) {
        return requester.delete('/Api/Roles/' + id);
    }
}

const rolesService = new RolesServiceImpl();

export default rolesService;