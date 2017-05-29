import {ISource} from "takcast.interface";
import {IMediaPlugin} from "takcast.interface";
import {ISourceInfo} from "takcast.interface";

export class Source implements ISource {
  public name:string;
  public type = "video";

  private info:{};
  private video:HTMLVideoElement;

  private stream:MediaStream;

  constructor(info:{id:string, name:string}) {
    this.name = info.name;
    this.info = {};
    this.video = document.createElement("video");
    this.video.controls = false;
    this.stream = null;
    setTimeout(() => {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: info.id,
            minWidth:320,
            minHeight:240,
            maxWidth:320,
            maxHeight:240
          }
        } as any
      }).then((stream) => {
        this.stream = stream;
        this.video.srcObject = stream;
        this.video.muted = true;
        this.video.play();
      });
    }, 200);
  }
  public release():void {
    Object.keys(this.info).forEach((key) => {
      var info = this.info[key] as ISourceInfo;
      info.plugin.onRemoveSource(this);
    });
    if(this.stream) {
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    this.video.pause();
    this.video = null;
  }
  public refInfo(mediaPlugin:IMediaPlugin):ISourceInfo {
    if(typeof(this.info[mediaPlugin.name]) == "undefined") {
      this.info[mediaPlugin.name] = {
        plugin:mediaPlugin,
        data: {}
      };
    }
    return this.info[mediaPlugin.name] as ISourceInfo;
  }
  public refAudioNode():AudioNode {
    return null;
  }
  public refVideoImage():HTMLVideoElement {
    return this.video;
  }
  public refDisplayElement():HTMLMediaElement {
    return this.video;
  }
  public setVolume(value:number):void {
  }
  public getVolume():number {
    return 0;
  }
}