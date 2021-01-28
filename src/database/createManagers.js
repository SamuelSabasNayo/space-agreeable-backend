/* eslint-disable no-console */
import { config } from 'dotenv';
import services from '../services/role';
import models from './models';

config();

const { User } = models,
  { findRoleByName } = services;

const createManager = async () => {
  try {
    const roleName = 'MANAGER';

    const role = await findRoleByName(roleName);
    if (!role) {
      console.log(`FATAL: create ${roleName} role first.[Hint: run 'npm run manager-role:create' to create manager role]`);
      return;
    }
    const hashedPswd = process.env.ADMIN_PASSWORD;

    const backendManager = {
        firstname: 'Backend',
        lastname: 'Manager',
        email: 'backendmanager@bn.com',
        roleId: role.id,
        isVerified: true,
        password: `B${hashedPswd}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      frontendManager = {
        firstname: 'Frontend',
        lastname: 'Manager',
        email: 'frontendmanager@bn.com',
        roleId: role.id,
        isVerified: true,
        password: `F${hashedPswd}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      databaseManager = {
        firstname: 'Database',
        lastname: 'Manager',
        email: 'databasemanager@bn.com',
        roleId: role.id,
        isVerified: true,
        password: `D${hashedPswd}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };

    await User.create(backendManager);
    await User.create(frontendManager);
    await User.create(databaseManager);
    console.log(`3 ${roleName}S created`);
  } catch (error) {
    console.log(error);
  }
};

createManager();
