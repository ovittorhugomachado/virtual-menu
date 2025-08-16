export const confirmIsLogged = (): boolean => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === "token" && value && value.length > 0) {
            return true;
        }
    }
    return false;
};