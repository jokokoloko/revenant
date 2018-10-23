export const userName = (user, empty) =>
    user.name && user.name.first && user.name.last
        ? `${user.name.first} ${user.name.last}`
        : user.name && user.name.first
            ? user.name.first
            : user.name && user.name.last
                ? user.name.last
                : empty;

export const userNameHandle = (user, empty) =>
    user.name && user.name.first && user.name.last
        ? `${user.name.first} ${user.name.last}`
        : user.name && user.name.first
            ? user.name.first
            : user.name && user.name.last
                ? user.name.last
                : user.handle
                    ? user.handle
                    : empty;

export const userNameHandleEmail = (user, empty) =>
    user.name && user.name.first && user.name.last
        ? `${user.name.first} ${user.name.last}`
        : user.name && user.name.first
            ? user.name.first
            : user.name && user.name.last
                ? user.name.last
                : user.handle
                    ? user.handle
                    : user.email
                        ? user.email
                        : empty;
