import models from './models';

const { userRoles } = models;

const managerRole = async () => {
  const role = {
    name: 'MANAGER',
    description: 'This is the manager of the site!',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await userRoles.create(role);
  // eslint-disable-next-line no-console
  console.log('Manager role created successfully!');
};

managerRole();
