if ("<notrack>" === "true") {
    // Disable sentry
    try {
        window.__SENTRY__.hub.getClient().getOptions().enabled = false;

        Object.keys(console).forEach(
            (x) => (console[x] = console[x].__sentry_original__ ?? console[x])
        );
    } catch {}
}
var findModule = (item) =>
    window.webpackChunkdiscord_app.push([
        [Math.random()],
        {},
        (req) => {
            for (const m of Object.keys(req.c)
                .map((x) => req.c[x].exports)
                .filter((x) => x)) {
                if (
                    m[item] !== undefined ||
                    (m.default && m.default[item] !== undefined)
                )
                    return m.default;
            }
        },
    ]);

let lastBgPrimary = "";
const themesync = async () => {
    const getVar = (name, el = document.body) =>
        el &&
        (
            getComputedStyle(el).getPropertyValue(name) ||
            getVar(name, el.parentElement)
        )?.trim();

    const bgPrimary = getVar("--background-primary");
    if (
        !bgPrimary ||
        bgPrimary === "#36393f" ||
        bgPrimary === "#fff" ||
        bgPrimary === lastBgPrimary
    )
        return; // Default primary bg or same as last
    lastBgPrimary = bgPrimary;

    const vars = [
        "--background-primary",
        "--background-secondary",
        "--brand-experiment",
        "--header-primary",
        "--text-muted",
    ];

    let cached = (await DiscordNative.userDataCache.getCached()) || {};

    const value = `body { ${vars.reduce(
        (acc, x) => (acc += `${x}: ${getVar(x)}; `),
        ""
    )} }`;
    const pastValue = cached["openasarSplashCSS"];
    cached["openasarSplashCSS"] = value;

    if (value !== pastValue)
        DiscordNative.userDataCache.cacheUserData(JSON.stringify(cached));
};

let interval = setInterval(() => {
    try {
        var FluxDispatcher = findModule("_dispatcher")._dispatcher;

        var applyPatches = () => {
            findModule("getCurrentUser").getCurrentUser().premiumType = 2;

            let wpRequire;
            window.webpackChunkdiscord_app.push([
                [Math.random()],
                {},
                (e) => {
                    wpRequire = e;
                },
            ]),
                (mod = Object.values(wpRequire.c).find(
                    (e) => void 0 !== e?.exports?.Z?.isDeveloper
                )),
                (usermod = Object.values(wpRequire.c).find(
                    (e) => e?.exports?.default?.getUsers
                )),
                (nodes = Object.values(
                    mod.exports.Z._dispatcher._actionHandlers._dependencyGraph
                        .nodes
                ));
            try {
                nodes
                    .find((e) => "ExperimentStore" == e.name)
                    .actionHandler.OVERLAY_INITIALIZE({ user: { flags: 1 } });
            } catch (e) {}
            (oldGetUser = usermod.exports.default.__proto__.getCurrentUser),
                (usermod.exports.default.__proto__.getCurrentUser = () => ({
                    hasFlag: () => !0,
                })),
                nodes
                    .find((e) => "DeveloperExperimentStore" == e.name)
                    .actionHandler.CONNECTION_OPEN(),
                (usermod.exports.default.__proto__.getCurrentUser = oldGetUser);

            console.log("%cSadCord Activated!", "font-size: 45px");
            console.log("%cExperiments Enabled!", "font-size: 30px");
            console.log("%cNitro Spoofed!", "font-size: 30px");
        };

        applyPatches();
        FluxDispatcher.setInterceptor((e) => {
            if (window.edit_logger && window.delete_logger) {
                FluxDispatcher.setInterceptor(() => {});
            }
            if (!window.edit_logger && e.type === "MESSAGE_UPDATE") {
                FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_UPDATE.find(
                    (h) => h.name === "MessageStore"
                ).actionHandler = (args) => {
                    try {
                        const messageContent = document.querySelector(
                            `#message-content-${args.message.id}`
                        );
                        const messageContainer = document.querySelector(
                            `#chat-messages-${args.message.id}`
                        );
                        const buttonContainer = messageContainer.querySelector(
                            ".buttonContainer-1502pf"
                        );
                        messageContainer.style = "background-color: black;";
                        buttonContainer.prepend("(edited)");
                        buttonContainer.style = "color: white;";
                        messageContent.innerText += "\n" + args.message.content;
                    } catch {}
                };
                window.edit_logger = true;
                console.log(
                    "%cMessage Edit Logger Enabled!",
                    "font-size: 30px"
                );
            } else if (!window.delete_logger && e.type === "MESSAGE_DELETE") {
                FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_DELETE.find(
                    (h) => h.name === "MessageStore"
                ).actionHandler = (args) => {
                    try {
                        document.querySelector(
                            `#chat-messages-${args.id}`
                        ).style = "background-color: black;";
                        document.querySelector(
                            `#message-content-${args.id}`
                        ).style = "color: red;";
                    } catch {}
                };
                window.delete_logger = true;
                console.log(
                    "%cMessage Delete Logger Enabled!",
                    "font-size: 30px"
                );
            }
        });
        FluxDispatcher.subscribe("CONNECTION_OPEN", (e) => {
            console.log(
                `%cLogged in as ${e.user.username}#${e.user.discriminator}!`,
                "font-size: 30px"
            );
            setTimeout(()=>{findModule("getCurrentUser").getCurrentUser().premiumType = 2;}, 15000); 
        });
        clearInterval(interval);
    } catch {}
}, 1000);

// Settings info version injection
setInterval(() => {
    const host = [
        ...document.querySelectorAll('[class*="info-"] [class*="line-"]'),
    ].find((x) => x.textContent.startsWith("Host "));
    if (!host || document.querySelector("#openasar-ver")) return;

    const el = document.createElement("span");
    el.id = "openasar-ver";

    el.textContent = "OpenAsar with SadCord [<hash>]";
    el.onclick = () => DiscordNative.ipc.send("DISCORD_UPDATED_QUOTES", "o");

    host.append(document.createTextNode(" | "), el);
}, 2000);

const injCSS = (x) => {
    const el = document.createElement("style");
    el.appendChild(document.createTextNode(x));
    document.body.appendChild(el);
};

injCSS(`
[class^="socialLinks-"] + [class^="info-"] {
  padding-right: 0;
}

#openasar-ver {
  text-transform: none;
  cursor: pointer;
}

#openasar-ver:hover {
  text-decoration: underline;
  color: var(--text-normal);
}`);

injCSS(`<css>`);

openasar = {}; // Define global for any mods which want to know / etc

DiscordNative.nativeModules.ensureModule("discord_voice"); // Ensure discord_voice to generally prevent corruption message / broken VC, also for deferring for fresh start

setInterval(() => {
    // Try init themesync
    try {
        themesync();
    } catch (e) {}
}, 10000);
themesync();
