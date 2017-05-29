"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
exports.pickupComponent = function (desktopCapture, isElectron) {
    return (function (_super) {
        __extends(PickupComponent, _super);
        function PickupComponent() {
            var _this = _super.call(this) || this;
            _this.state = {
                index: -1
            };
            _this.captureTarget = [];
            _this.stream = null;
            _this.change = _this.change.bind(_this);
            if (isElectron) {
                var desktopCapture = window["require"]("electron").desktopCapturer;
                // electron動作の場合は動作可能
                desktopCapture.getSources({ types: ["window", "screen"] }, function (error, sources) {
                    if (error) {
                        return;
                    }
                    sources.forEach(function (source) {
                        _this.captureTarget.push({ id: source.id,
                            name: source.name });
                    });
                    _this.setupUserMedia(0);
                    _this.setState({ index: 0 });
                });
            }
            return _this;
        }
        PickupComponent.prototype.componentWillUnmount = function () {
            if (this.stream != null) {
                this.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
        };
        PickupComponent.prototype.setupUserMedia = function (index) {
            var _this = this;
            if (this.stream) {
                this.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            desktopCapture._setCaptureTarget(this.captureTarget[index]);
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: "desktop",
                        chromeMediaSourceId: this.captureTarget[index].id,
                        minWidth: 320,
                        minHeight: 240,
                        maxWidth: 320,
                        maxHeight: 240
                    }
                }
            }).then(function (stream) {
                _this.stream = stream;
                var video = _this.refs["view"];
                video.srcObject = stream;
                video.muted = true;
                video.controls = false;
                video.play();
            });
        };
        PickupComponent.prototype.change = function (item) {
            this.setupUserMedia(item.target.value);
            this.setState({ index: item.target.value });
        };
        PickupComponent.prototype.render = function () {
            return (React.createElement(Form, null,
                React.createElement(FormGroup, { controlId: "formControlsSelect" },
                    React.createElement(FormControl, { componentClass: "select", onChange: this.change }, this.captureTarget.map(function (target, i) {
                        return React.createElement("option", { value: i, key: i }, target.name);
                    }))),
                React.createElement(FormGroup, null,
                    React.createElement("video", { ref: "view", style: { width: 320, height: 240 } }))));
        };
        return PickupComponent;
    }(React.Component));
};
