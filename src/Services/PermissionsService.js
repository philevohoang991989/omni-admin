const PERMISSIONS = {
    VIEW: 1,
    CREATE: 2,
    UPDATE: 4,
    DELETE: 8
}

class PermissionsServiceImpl {

    hasPermission(target, permission) {
    }

}

const permissionsService = new PermissionsServiceImpl();

export default permissionsService;