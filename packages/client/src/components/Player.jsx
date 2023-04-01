export const Player = ({pos}) => {
    return (
        <div
            className={`vte-player`}
            style={{
                width: `1rem`,
                height: `1rem`,
                position: 'absolute',
                left: `${pos.x}rem`,
                top: `${pos.y}rem`
            }}
        >P</div>
    )
}