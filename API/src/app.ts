import { App } from "./config/server";

async function main(){
    const APP: App = new App();

    await APP.listen();
}

main();