/* eslint-disable no-console */
import { config } from 'dotenv';
import roleService from '../services/role';
import models from './models';

const { User } = models;
config();

const createAdmin = async () => {
  const roleName = 'SUPER_ADMIN';

  const role = await roleService.findRoleByName(roleName);
  if (!role) {
    console.log(`FATAL: create ${roleName} role first.[Hint: run 'npm run role:create' to create role]`);
    return;
  }
  const { ADMIN_PASSWORD } = process.env;

  const admin = {
    firstname: 'Nomad',
    lastname: 'admin',
    email: 'spacenomad@gmail.com',
    roleId: role.id,
    isVerified: true,
    password: ADMIN_PASSWORD,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await User.create(admin);
  console.log(`${roleName} created`);
};

createAdmin();
