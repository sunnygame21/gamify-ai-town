const Message = ({
    message = [],
    trail = 35,
    multiplier = 1,
    onMessageEnded = () => { },
    forceShowFullMessage = false,
}) => {
    return (
        <div style={{
          fontFamily: '"宋体"',
          fontSize: `${8 * multiplier}px`,
          textTransform: 'uppercase',
          lineHeight: '1.5em'
        }}>
            <span dangerouslySetInnerHTML={{ __html: message }}></span>
        </div>
    );
};

export default Message;
