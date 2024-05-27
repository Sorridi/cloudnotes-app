

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

        try {
            let content = fs.readFileSync(file, 'utf8');

            let parsedContent = JSON.parse(content);

            this.data.set(title, parsedContent);
            this[title.toUpperCase()] = file;

            console.log(`Loaded ${title} from ${file}: ${content}`);
        } catch (err) {
            // Handle any errors that occur during reading or parsing
            console.error(`Error loading ${title} from ${file}:`, err);
            throw err;
        }
    }
}

export { DataBase };