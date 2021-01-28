/* eslint-disable no-underscore-dangle */
import models from '../database/models';
import roleService from '../services/role';

const { userRoles, User } = models;

export default {
  assignRole: async (req, res) => {
    const { _userId, _roleId } = req.body;

    const userRole = await roleService.findRoleById(_roleId);
    if (!userRole) return res.status(404).json({ message: res.__('Role does not exist') });

    const user = await User.findOne({ where: { id: _userId } });
    if (!user) {
      return res.status(404).json({ message: res.__('User not found!') });
    }
    const roleId = userRole.id;
    const updateUser = await User.update({ roleId }, { where: { id: _userId } });
    if (updateUser) {
      return res.status(200).json({ message: res.__('Role assigned successfully') });
    }
  },
  createRole: async (req, res) => {
    const { name } = req.body;
    const roleName = await roleService.findRoleByName(name);
    if (roleName) {
      return res.status(400).json({ message: res.__(`${name} already exist`) });
    }

    const newRole = await userRoles.create({
      name: req.body.name,
      description: req.body.description,
    });

    if (newRole) {
      return res.status(201).json({ message: res.__('Role created successfully!'), newRole });
    }
    return res.status(500).json({ message: 'something went wrong!' });
  },
  getRoles: async (req, res) => {
    const roles = await userRoles.findAll({ attribute: ['id', 'name', 'description'] });

    if (!roles) {
      return res.status(404).json({ message: res.__('There are no roles assigned yet') });
    }
    if (roles) {
      return res.status(200).json({ message: res.__('Roles found in system'), roles });
    }
  },
  getRole: async (req, res) => {
    const { id } = req.params;
    const singleRole = await roleService.findRoleById(id);

    if (!singleRole) {
      return res.status(404).json({ message: res.__('No role found with such id') });
    }
    if (singleRole) {
      return res.status(200).json({ message: res.__('Role found in the system'), singleRole });
    }
  },
  updateRole: async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const roleToUpdate = await roleService.findRoleById(id);
    if (!roleToUpdate) {
      return res.status(404).json({ message: res.__('No role found with such id') });
    }
    if (roleToUpdate.name === 'SUPER_ADMIN') {
      return res.status(403).json({ message: res.__('SUPER_ADMIN role connot be updated!') });
    }
    if (roleToUpdate) {
      await roleToUpdate.update({ name, description });
    }
    return res.status(200).json({ message: res.__('Role updated successfully'), roleToUpdate });
  },
  deleteRole: async (req, res) => {
    const { id } = req.params;
    const roleToDelete = await roleService.findRoleById(id);

    if (!roleToDelete) {
      return res.status(404).json({ message: res.__('No role found with such id') });
    }
    if (roleToDelete.name === 'SUPER_ADMIN') {
      return res.status(403).json({ message: res.__('SUPER_ADMIN role cannot be deleted') });
    }
    await userRoles.destroy({ where: { id } });
    return res.status(200).json({ message: res.__('Role deleted successfully!') });
  }
};
