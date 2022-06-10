let {NULL} = require("mysql/lib/protocol/constants/types");

class User {
    constructor() {}

    // register user
    registerUserSQL(obj) {
        let sql = `INSERT INTO ecommerce_users (name,email,password,active,user_role) VALUES (`+
            `'${obj.name}', '${obj.email}', '${obj.hash}', '${obj.active}', '${obj.user_role}');`;
        return sql;
    }

    // fetch user details
    fetchUserDetailsSQL(type, value) {
        let sql = `SELECT * FROM ecommerce_users as user where user.${type} = '${value}'`;
        return sql;
    }
}
export default User;
