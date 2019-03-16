export enum Transport { RTMP }

export type NMSOption = {
    transport?: Transport.RTMP;
    rtmp: {
        port: number;
        chunk_size?: number;
        gop_cache?: boolean;
        ping?: number;
        ping_timeout?: number;
    },
    http?: {
        port?: number;
        allow_origin?: string;
        webroot?: string;
        mediaroot?: string;
    },
    https?: {
        port?: number;
        key?: string;
        cert?: string;
    },
    auth?: {
        api?: boolean;
        api_uesr?: string;
        api_pass?: string;
        play?: boolean;
        publish?: boolean;
        secret?: string;
    }
}

export type streamCB = ((id: string, option: {}) => void) |
                    ((id: string, StreamPath: string,  option: {}) => void);

