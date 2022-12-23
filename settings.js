import { networkInterfaces } from "os";

export const IP_ADDR = Object.values(networkInterfaces())
  .flat()
  .find((i) => (i.family == "IPv4" || i.family == 4) && !i.internal);

export const CORSOPTIONS = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

export let settings = {
  serverIP: IP_ADDR ? IP_ADDR.address : "127.0.0.1",
  serverPort: null,
  serverPortRangeEnd: null,
  filebrowserPaths: [],
  socketName: null,
  uselocaldb: false,
  unsafefilebrowsing: false,
  verbose: false,
};

/*
Loads settings
*/
export const loadSettings = (argv) => {
  settings.socketName = argv._[0];
  settings.serverPort = argv.webport;
  settings.serverPortRangeEnd = argv.webportrangeend;
  settings.uselocaldb = argv.uselocaldb;
  settings.unsafefilebrowsing = argv.unsafefilebrowsing;
  settings.verbose = argv.verbose;
  settings.osdMessages = argv["osd-messages"];

  if (argv.filebrowserpaths) {
    settings.filebrowserPaths = argv.filebrowserpaths.map((el, index) => {
      return {
        index,
        path: el.replace(/^"|'+|"|'+$/g, ""),
      };
    });
  }
};
