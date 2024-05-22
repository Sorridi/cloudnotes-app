

class DataBase {
    static [k: string]: any;

    private static data: Map<string, any[]> = new Map();


    public static append(title: string, data: any): void {
        if (this.data.has(title)) {
            this.data.get(title)?.push(data);
        } else {
            this.data.set(title, [data]);
        }
    }

    public static get(table: string): any[] {
        return this.data.get(table) || [];
    }

    public static load(file: string, title: string): void {
        const fs = require('fs');

        let content = fs.readSync(file, 'utf8', (err: any, data: any) => {
            if (err) throw err;
            this.data = JSON.parse(data);
        }).toString();

        this.data.set(title, JSON.parse(content));

        this[title] = file;
        console.log(`Loaded ${title} from ${file}: ${content}`);
    }
}