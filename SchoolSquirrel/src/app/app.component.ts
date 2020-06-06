import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    isFullScreenPage: boolean;
    constructor(private router: Router) {
        this.router.events.subscribe((r) => {
            if (r instanceof NavigationEnd) {
                if (r.url.indexOf("login") == -1) {
                    this.isFullScreenPage = false;
                } else {
                    this.isFullScreenPage = true;
                }
            }
        });
        if (window && window.process && window.process.type) { // isElectron
            // eslint-disable-next-line
            window.require("electron").ipcRenderer.send("ready");
        }
    }
}
