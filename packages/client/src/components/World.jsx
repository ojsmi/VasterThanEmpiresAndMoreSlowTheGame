export const World = ({children, width, height }) => {
    return <div
        className={`vte-world`}
        style={{
            width: `${width}rem`,
            height: `${height}rem`,
            display: 'flex',
            flexWrap: 'wrap'
        }}
    >
        {children}
    </div>
}