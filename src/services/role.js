import models from '../database/models';

const { userRoles } = models;

export default {
  findRoleByName: async (userRole) => {
    const role = await userRoles.findOne({ where: { name: userRole } });
    if (role) return role;
  },
  findRoleById: async (roleId) => {
    const role = await userRoles.findOne({ where: { id: roleId } });
    if (role) return role;
  }
};
