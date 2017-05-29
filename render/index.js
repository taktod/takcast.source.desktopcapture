"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pickupComponent_1 = require("./ui/pickupComponent");
var source_1 = require("./source");
var DesktopCapture = (function () {
    function DesktopCapture() {
        this.name = "desktopCapture";
        this.type = "source";
        this.newSourceInfo = null;
    }
    DesktopCapture.prototype.setPlugins = function (plugins) {
        this.basePlugin = plugins["base"][0];
    };
    DesktopCapture.prototype._setCaptureTarget = function (data) {
        this.newSourceInfo = {
            id: data.id,
            name: data.name
        };
    };
    DesktopCapture.prototype.refPickupComponent = function () {
        return pickupComponent_1.pickupComponent(this, this.basePlugin.isElectron());
    };
    DesktopCapture.prototype.createNewSource = function () {
        if (this.newSourceInfo == null) {
            return null;
        }
        return new source_1.Source(this.newSourceInfo);
    };
    return DesktopCapture;
}());
exports.DesktopCapture = DesktopCapture;
exports._ = new DesktopCapture();
