import { ISource } from "takcast.interface";
import { IMediaPlugin } from "takcast.interface";
import { ISourceInfo } from "takcast.interface";
export declare class Source implements ISource {
    name: string;
    type: string;
    private info;
    private video;
    private stream;
    constructor(info: {
        id: string;
        name: string;
    });
    release(): void;
    refInfo(mediaPlugin: IMediaPlugin): ISourceInfo;
    refAudioNode(): AudioNode;
    refVideoImage(): HTMLVideoElement;
    refDisplayElement(): HTMLMediaElement;
    setVolume(value: number): void;
    getVolume(): number;
}
