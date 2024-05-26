declare global {
    interface Window {
        electron: {
            api: {
                dispatcher: () => EventDispatcher;
            };
        };
    }
}