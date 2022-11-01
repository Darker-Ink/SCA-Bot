const https = require("node:https");

class Minecraft {

    static getUUIDEndpoint(uuid) {
        return `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`;
    }

    static getUsernameEndpoint(username) {
        return `https://api.mojang.com/users/profiles/minecraft/${username}`;
    }

    /**
     * @param {string} username
     * @returns {Promise<import('../../').userData>}
     */
    static userExists(username) {

        return new Promise((resolve, reject) => {
            https.get(this.getUsernameEndpoint(username), res => {

                let body = ""

                res.on("data", chunk => {
                    const stringed = Buffer.from(chunk).toString();

                    try {
                        body = JSON.parse(stringed)
                    } catch (err) {
                        reject(err);
                    }
                })

                res.on('close', () => {
                    if (body.error == "BadRequestException") {
                        resolve({
                            exists: false,
                            data: null,
                            error: body.errorMessage
                        });
                    } else {
                        resolve({
                            exists: true,
                            data: body,
                            error: null
                        });
                    }
                })
            });
        });
    }
}

module.exports = Minecraft;