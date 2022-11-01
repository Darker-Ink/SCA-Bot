const Minecraft = require("./src/utils/Minecraft");

(async () => {
    const usr = await Minecraft.userExists("DarkerInk");

    console.log(usr);
})();