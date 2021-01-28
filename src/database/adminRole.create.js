import models from './models';

const { userRoles } = models;

const adminRole = async () => {
  const role = {
    name: 'SUPER_ADMIN',
    description: 'This is the super admin of the site!',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await userRoles.create(role);
  // eslint-disable-next-line no-console
  console.log('Super admin role created successfully!');
};

adminRole();
