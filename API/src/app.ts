import { App } from "./config/server";

async function main(){
    const APP: App = new App(3030);

    await APP.listen();
}

main();