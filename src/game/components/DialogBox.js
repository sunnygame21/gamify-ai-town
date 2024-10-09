import { useCallback, useEffect, useState } from 'react';

import './dialogbox.css';
import axios from 'axios';
// Components
import Message from './Message';
import { addHistory, getPrevAnser, getChatHistory, addChatHistory } from '@/game/ChatUtils';
// Images
const dialogBorderBox = '/assets/images/dialog_borderbox.png';

const DialogBox = ({
    messages,
    characterName,
    onDone,
    gameSize,
}) => {
    const {
        width,
        height,
        multiplier,
    } = gameSize;
    const messageBoxHeight = Math.ceil((height / 5) * multiplier);

    const [currentMessage, setCurrentMessage] = useState(0);
    const [messageEnded, setMessageEnded] = useState(false);

    const handleClick = useCallback(() => {
        if (messageEnded) {
            setMessageEnded(false);
            if (currentMessage < messages.length - 1) {
                setCurrentMessage(currentMessage + 1);
            } else {
                setCurrentMessage(0);
                onDone();
            }
        } else {
            setMessageEnded(true);
        }
    }, [currentMessage, messageEnded, messages.length, onDone]);

    const [messageText, setMessageText] = useState('');

    const sendMessage = () => {

        console.log('send conversation:', messageText);

        // Insert logic to start a new game, such as initializing game state or routing to the game screen
        addChatHistory("you", messageText);

        try {
            const session_id = 'ses_' + Math.random().toString(36).substr(2, 9);

            console.log('Starting new game with session_id:', session_id);  // For debugging

            axios.post('/api/rpggo/chatwithnpc', {
                game_id: '7411057c-43a0-4fbb-b4b8-f0b02ba3cb02',
                session_id: 'ses_qsv1jjiqd',
                character_id: '1aeaa765-a163-4898-b00b-c9b868e7457d',
                message: messageText

            }).then((res) => {
                const chatData = res.data
                addChatHistory('npc_03', chatData.text);
                console.log('chat finished:', chatData);
            });

        } catch (error) {
            console.error('Error starting game:', error);
        }

        console.log('send message:', messageText);
    }

    return (
        
        <div
            className='dialogBox'
            style={{
                borderImage: `url("${dialogBorderBox}") 6 / ${6 * multiplier}px ${6 * multiplier}px ${6 * multiplier}px ${6 * multiplier}px stretch`,
                padding: `${8 * multiplier}px`,
                top: `${Math.ceil((height * multiplier) - (messageBoxHeight + messageBoxHeight * 0.4))}px`,
                width: `${Math.ceil(width * 0.5 * multiplier)}px`,
                minHeight: `${messageBoxHeight}px`,
            }}
        >
            <div
                onClick={handleClick}
                className='dialogFooter'
                style={{
                    fontSize: `${6 * multiplier}px`,
                    right: `${6 * multiplier}px`,
                    bottom: `${6 * multiplier}px`,
                }}
            >
                {'Close'}
            </div>
            <div style={{
                fontSize: `${6 * multiplier}px`,
                marginBottom: `${6 * multiplier}px`,
                fontWeight: 'bold',
            }}>
                {characterName}
            </div>
            <Message
                action={messages[currentMessage].action}
                message={messages[currentMessage].message}
                key={currentMessage}
                multiplier={multiplier}
                forceShowFullMessage={true}
                onMessageEnded={() => {
                    setMessageEnded(true);
                }}
            />
            <div className='textbox'>
                <textarea
                    rows={5}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                ></textarea>
                <div className='btnbox'>
                    <button onClick={() => { sendMessage() }}>Send</button>
                </div>
            </div>

        </div>
    );
};

export default DialogBox;
