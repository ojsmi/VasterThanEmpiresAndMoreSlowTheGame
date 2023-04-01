export const World = ({children}) => {
    return <div
        className={`vte-world`}
        style={{
            width: '100rem',
            height: '100rem',
            display: 'flex',
            flexWrap: 'wrap'
        }}
    >
        {children}
    </div>
}