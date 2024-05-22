
interface HItem {
    coords: any;
    [k: string]: any;
}


class HistoryItem {
    [k: string]: any;

    public constructor(kv: HItem) {
         for (let k in kv) {
             this[k] = kv[k];
         }
    }
}

class ActionHistory {
    private readonly history: HistoryItem[] = [];
    private readonly future: HistoryItem[] = [];

    private move(from: HistoryItem[], to: HistoryItem[]): HistoryItem | undefined {
        if (from.length === 0) {
            return;
        }
        let item = this.remove(from);
        if (item !== undefined) this.add(item, to);
        return item;
    }

    private add(item: HistoryItem, to: HistoryItem[] = this.history): void {
        if (to == this.history) to.push(item);
        else to.unshift(item)
    }

    private remove(from: HistoryItem[]): HistoryItem | undefined {
        return (from == this.history) ? from.pop() : from.shift();
    }

    private empty(): void {
        for (let i = 0; i < this.future.length; i++) {
            this.future.pop();
        }
    }

    public createHistory(kv: HItem): HistoryItem {
        let item = new HistoryItem(kv)
        this.add(item);

        this.empty();

        return item;
    }

    public revert(): HistoryItem | undefined {
        return this.move(this.history, this.future);
    }

    public toFuture(): HistoryItem | undefined {
        return this.move(this.future, this.history);
    }

}


