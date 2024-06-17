import { useEffect, useState } from 'react';
import '@pages/panel/Panel.css';
import { chown } from 'fs';

export default function Panel(): JSX.Element {
    const [urls, setUrls] = useState<string[]>([]);
    useEffect(() => {
        const listener = (changes: any) => {
            console.log('Storage changed: ', changes.urls.newValue);
            setUrls(changes.urls.newValue || []);
        };
        chrome.storage.onChanged.addListener(listener);
        return () => {
            chrome.storage.local.clear();
            chrome.storage.onChanged.removeListener(listener);
        };
    }, []);
    const onClear = () => {
        chrome.storage.local.clear();
    };
    return (
        <div className="container">
            <h1>Dev Tools Panel</h1>
            {urls.length || 0}
            <button onClick={onClear}>Clear</button>
            {urls.map((url) => (
                <p key={url}>
                    {url.split('/').pop()}
                    <br />
                </p>
            ))}
        </div>
    );
}
