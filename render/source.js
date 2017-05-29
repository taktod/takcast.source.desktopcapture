"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Source = (function () {
    function Source(info) {
        var _this = this;
        this.type = "video";
        this.name = info.name;
        this.info = {};
        this.video = document.createElement("video");
        this.video.controls = false;
        this.stream = null;
        setTimeout(function () {
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: "desktop",
                        chromeMediaSourceId: info.id,
                        minWidth: 320,
                        minHeight: 240,
                        maxWidth: 320,
                        maxHeight: 240
                    }
                }
            }).then(function (stream) {
                _this.stream = stream;
                _this.video.srcObject = stream;
                _this.video.muted = true;
                _this.video.play();
            });
        }, 200);
    }
    Source.prototype.release = function () {
        var _this = this;
        Object.keys(this.info).forEach(function (key) {
            var info = _this.info[key];
            info.plugin.onRemoveSource(_this);
        });
        if (this.stream) {
            this.stream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
        this.video.pause();
        this.video = null;
    };
    Source.prototype.refInfo = function (mediaPlugin) {
        if (typeof (this.info[mediaPlugin.name]) == "undefined") {
            this.info[mediaPlugin.name] = {
                plugin: mediaPlugin,
                data: {}
            };
        }
        return this.info[mediaPlugin.name];
    };
    Source.prototype.refAudioNode = function () {
        return null;
    };
    Source.prototype.refVideoImage = function () {
        return this.video;
    };
    Source.prototype.refDisplayElement = function () {
        return this.video;
    };
    Source.prototype.setVolume = function (value) {
    };
    Source.prototype.getVolume = function () {
        return 0;
    };
    return Source;
}());
exports.Source = Source;
