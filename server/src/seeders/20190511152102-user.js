module.exports = {
    up: queryInterface => queryInterface.bulkInsert('Users', [
        {
            firstname: 'Malik',
            lastname: 'Godwin',
            email: 'despeauxz@gmail.com',
            phoneNo: '+2348108677621',
            isAdmin: true,
            password: '$2b$10$bZfgztKsXTlPvipd.Fzra.qu6lJTaSP33H0BlzlEAO0r61ciLKE/y',
            createdAt: '2019-05-10 17:51:53.641+01',
            updatedAt: '2019-05-10 17:51:53.641+01',
        },
        {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@gmail.com',
            isAdmin: false,
            password: '$2b$10$bZfgztKsXTlPvipd.Fzra.qu6lJTaSP33H0BlzlEAO0r61ciLKE/y',
            createdAt: '2019-05-10 17:51:53.641+01',
            updatedAt: '2019-05-10 17:51:53.641+01',
        }
    ]),

    down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
