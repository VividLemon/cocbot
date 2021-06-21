module.exports = roleName => {
    let discordRole;
    switch (roleName) {
        case 'leader':
            discordRole = 'owner';
            break;
        case 'coLeader':
            discordRole = 'SuperAdmin';
            break;
        case 'admin': 
            discordRole = 'Admin';
            break;
    }
    return discordRole;
}