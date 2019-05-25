const getUserObject = user => ({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    othername: user.othername,
    avatar: user.avatar,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

export default getUserObject;
