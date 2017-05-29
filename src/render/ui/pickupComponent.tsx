import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";

import {DesktopCapture} from "..";

var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;

export var pickupComponent = (desktopCapture:DesktopCapture, isElectron:boolean):any => {
  return class PickupComponent extends React.Component<{}, {}> {
    private stream:MediaStream;
    private captureTarget:{name:string, id:string}[];
    state = {
      index:-1
    };
    constructor() {
      super();
      this.captureTarget = [];
      this.stream = null;
      this.change = this.change.bind(this);
      if(isElectron) {
        var desktopCapture:Electron.DesktopCapturer = window["require"]("electron").desktopCapturer;
        // electron動作の場合は動作可能
        desktopCapture.getSources({types:["window", "screen"]}, (error, sources) => {
          if(error) {
            return;
          }
          sources.forEach((source) => {
            this.captureTarget.push(
              {id: source.id,
              name: source.name}
            );
          })
          this.setupUserMedia(0);
          this.setState({index: 0});
        });
      }
    }
    public componentWillUnmount() {
      if(this.stream != null) {
        this.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
    private setupUserMedia(index:number) {
      if(this.stream) {
        this.stream.getTracks().forEach((track) => {
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
            minWidth:320,
            minHeight:240,
            maxWidth:320,
            maxHeight:240
          }
        } as any
      }).then((stream) => {
        this.stream = stream;
        var video = this.refs["view"] as HTMLVideoElement;
        video.srcObject = stream;
        video.muted = true;
        video.controls = false;
        video.play();
      });
    }
    private change(item) {
      this.setupUserMedia(item.target.value);
      this.setState({index: item.target.value});
    }
    public render() {
      return (
        <Form>
          <FormGroup controlId="formControlsSelect">
            <FormControl componentClass="select" onChange={this.change}>
              {this.captureTarget.map((target, i) => {
                return <option value={i} key={i}>{target.name}</option>
              })}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <video ref="view" style={{width:320, height:240}}></video>
          </FormGroup>
        </Form>
      );
    }
  }
}