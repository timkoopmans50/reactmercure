import React, {useEffect, useRef, useState} from 'react';
/*
* Simple proof of concept to connect to mercure.
* Note that useRef has to be used in order to access the state within a callback.
* */
function MercureList() {
    const [mercureMessages, setMercureMessages] = useState([]);
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
    return (
        <div>
            <h1>Mercure updates</h1>
            { mercureMessages.map((msg,index) => {
                return <div style={divStyle} key={index}>{msg}</div>
            })}
        </div>
    );
}

export default MercureList;