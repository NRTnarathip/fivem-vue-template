import { SetRootVariable } from "./Utils";

class AppConfig {
    // Config here
    uiScale = 1;
    uiPadding = 50;

    // don't edit
    Init() {
        this.SetUIScaleWithResponsive();
        this.HandleOnResizeWindow = this.HandleOnResizeWindow.bind(this);
        window.onresize = this.HandleOnResizeWindow;
    }

    DisableUIScale() {
        window.onresize = null;
        SetRootVariable("uiScale", "none");
    }

    private HandleOnResizeWindow() {
        this.SetUIScaleWithResponsive();
    }

    private CalcScaleWithBaseSize(screenWidth: number, screenHeight: number, baseWidth: number, baseHeight: number) {
        return Math.min(screenWidth / baseWidth, screenHeight / baseHeight);
    }

    private SetUIScaleWithResponsive(): void {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let newScaleResponesive = this.uiScale * this.CalcScaleWithBaseSize(screenWidth, screenHeight, 1920, 1080);
        SetRootVariable("uiScale", newScaleResponesive);
        SetRootVariable("uiPadding", this.uiPadding * newScaleResponesive + "px");
    }
}

export const appConfig = new AppConfig();