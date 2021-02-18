/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Questions',
    [
      {
        email: 'user1@bn.com',
        name: 'User1 Nomad',
        subject: 'Jump to section',
        message:
            'Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@bn.com',
        name: 'User2 Nomad',
        subject: 'Related Topics',
        message:
            'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@bn.com',
        name: 'User3 Nomad',
        subject: 'Asking questions',
        message:
            'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user4@bn.com',
        name: 'User4 Nomad',
        subject: 'Creating an Account',
        message:
            'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],

    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Questions', null, {})
};
