import React, {useEffect, useRef, useState} from 'react';

function MercureList() {
    const [mercureMessages, setMercureMessages] = useState(["init","init2"]);
    const messagesRef = useRef(mercureMessages);
    const setMessages = data => {
        messagesRef.current = data;
        setMercureMessages(data);
    };
    useEffect(() => {
        const updateMercureMessages = message => {
            console.log('update');
            const msg = JSON.parse(message.data);
            const val = msg.settingKey + '=>' + msg.settingValue;
            setMessages([...messagesRef.current,val]);
        }

        const url = new URL('http://sulu.test:9090/.well-known/mercure');
        url.searchParams.append('topic', `http://sulu.test/api/settings/{id}`);
        let eventSource = new EventSource(url);
        eventSource.addEventListener('message', updateMercureMessages, false);
    },[]);

    const divStyle = {
        color: 'blue',
        width: '100%'
    };
    console.log(mercureMessages);
    return (
        <div>
            <h1>Mercure updates</h1>
            { mercureMessages.map((msg) => {
                // alert(msg);
                return <div style={divStyle} key={Math.random()}>{msg}</div>
            })}
        </div>
    );
}

export default MercureList;