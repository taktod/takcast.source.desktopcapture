/// <reference types="react" />
import * as React from "react";
import { ISourcePlugin } from "takcast.interface";
import { IPlugin } from "takcast.interface";
import { ISource } from "takcast.interface";
export declare class DesktopCapture implements ISourcePlugin {
    name: string;
    type: string;
    private newSourceInfo;
    private basePlugin;
    constructor();
    setPlugins(plugins: {
        [type: string]: Array<IPlugin>;
    }): void;
    _setCaptureTarget(data: {
        id: string;
        name: string;
    }): void;
    refPickupComponent(): React.ComponentClass<{}>;
    createNewSource(): ISource;
}
export declare var _: DesktopCapture;
