/**
 * _ApplicationRelaunchHandler_ is a component which enables a application in Open webOS to
 * detect a relaunch of itself when it is running as background window.
 *
 * Example:
 * enyo.kind({
 *      kind: "webosports.ApplicationRelaunchHandler"
 *      handlers: {
 *          onApplicationRelaunch: "handleApplicationRelaunch",
 *      },
 *      handleApplicationRelaunch: function(inSender, inEvent) {
 *          // [...] code for handling the relaunch event
 *
 *          // Stop propagation of event
 *          return true;
 *      }
 *  }
 */
enyo.kind({
    name: "webosports.ApplicationRelaunchHandler",
    kind: enyo.Object,
    events: {
        onApplicationRelaunch: "",
    },
    constructor: function() {
        if (window.Mojo) {
            window.Mojo.relaunch = function() {
                var launchParams = {};

                if (PalmSystem)
                    launchParams = JSON.parse(PalmSystem.launchParams);

                console.log("Handling Mojo.relaunch with launchParams=" + PalmSystem.launchParams);
                this.doApplicationRelaunch(launchParams);

                // need to return true to tell sysmgr the relaunch succeeded.
                // otherwise, it'll try to focus the app, which will focus the first
                // opened window of an app with multiple windows.
                return true;
            };
        }
        else {
            console.log("window.Mojo object not available; could not install applicationRelaunch handler");
        }
    }
});
