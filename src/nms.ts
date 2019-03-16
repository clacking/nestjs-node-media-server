import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { NodeMediaServer } from 'node-media-server';
import { NMSOption, streamCB } from './option.interface';

export class NMServer extends Server implements CustomTransportStrategy {
    private server;
    constructor(private readonly config: NMSOption) {
        super();
    }

    public listen() {
        this.init();
    }

    public close() {
        this.server.stop();
        this.server = null;
    }

    public bindEvent() {
        const patterns = Object.keys(this.messageHandlers);
        patterns.forEach(event => {
            this.setEventHandler(event, this.messageHandlers[event]);
        })
    }

    public setEventHandler(event: string, callback: streamCB) {
        const wrap = this.extendArg(callback);
        this.server.on(event, wrap);
    }

    // extending args...
    private extendArg(func: streamCB) {
        // @ts-ignore
        return (...args) => func(...args, this.server.getSession); // ????
    }

    private init() {
        this.server = new NodeMediaServer(this.config);
        this.bindEvent();
        this.server.run();
    }
}

