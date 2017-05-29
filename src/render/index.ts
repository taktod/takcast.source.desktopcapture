import * as React from "react";

import {ISourcePlugin} from "takcast.interface";
import {IPlugin} from "takcast.interface";
import {ISource} from "takcast.interface";
import {IBasePlugin} from "takcast.interface";

import {pickupComponent} from "./ui/pickupComponent";
import {Source} from "./source";

export class DesktopCapture implements ISourcePlugin {
  public name="desktopCapture";
  public type="source";

  private newSourceInfo:{id:string, name:string};
  private basePlugin:IBasePlugin;
  constructor() {
    this.newSourceInfo = null;
  }
  public setPlugins(plugins:{[type:string]:Array<IPlugin>}):void {
    this.basePlugin = plugins["base"][0] as IBasePlugin;
  }
  public _setCaptureTarget(data:{id:string, name:string}):void {
    this.newSourceInfo = {
      id:data.id,
      name:data.name
    };
  }
  public refPickupComponent():React.ComponentClass<{}> {
    return pickupComponent(this, this.basePlugin.isElectron());
  }
  public createNewSource():ISource {
    if(this.newSourceInfo == null) {
      return null;
    }
    return new Source(this.newSourceInfo);
  }
}

export var _ = new DesktopCapture();