import { IpcMainEvent, IpcRendererEvent } from 'electron';
import { ipcMain, ipcRenderer } from 'electron';

interface Listener {
    func: ((event: IpcMainEvent | IpcRendererEvent, data: any) => void);
    state: boolean;
}


class EventDispatcher {
    private readonly lis: Map<string, Map<string, Listener>> = new Map<string, Map<string, Listener>>();
    private readonly _interface: any;

    private static _renderer: EventDispatcher;
    private static _main: EventDispatcher;

    private constructor(_interface: any) {
        this._interface = _interface;
    }

    public addListener(channel: string, title: string,  listener: (event: IpcMainEvent | IpcRendererEvent, data: any) => void): void {
        let lobj: Listener = {
            func: (event: any, data: any) => {
                let lisObj = this.lis.get(channel)?.get(title);
                if (lisObj?.state) listener(event, data);
            },
            state: true
        };
        if (!this.lis.has(channel)) {
            this.lis.set(channel, new Map<string, Listener>());
        }
        this.lis.get(channel)?.set(title, lobj);
        this._interface.on(channel, lobj.func);
    }

    public removeListener(channel: string, title: string): void {
        let lisObj = this.lis.get(channel)?.get(title);
        if (lisObj) {
            this._interface.removeListener(channel, lisObj.func);
            this.lis.get(channel)?.delete(title);
        }
    }

    private setState(channel: string, title: string, state: boolean): void {
        let lisObj = this.lis.get(channel)?.get(title);
        if (lisObj) lisObj.state = state;
    }

    public enable(channel: string, title: string): void {
        this.setState(channel, title, true);
    }

    public disable(channel: string, title: string): void {
        this.setState(channel, title, false);
    }

    public static getRenderer(): EventDispatcher {
        if (!EventDispatcher._renderer) {
            EventDispatcher._renderer = new EventDispatcher(ipcRenderer);
        }
        return EventDispatcher._renderer;
    }

    public static getMain(): EventDispatcher {
        if (!EventDispatcher._main) {
            EventDispatcher._main = new EventDispatcher(ipcMain);
        }
        return EventDispatcher._main;
    }
}

export { EventDispatcher };