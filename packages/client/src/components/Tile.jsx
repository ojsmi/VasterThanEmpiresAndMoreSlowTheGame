
export const Tile = ({id}) => {
    return <div
        className={`vte-tile vte-tile__${id}`}
        style={{
            width: '1rem',
            height: '1rem',
            textAlign: 'center',
            lineHeight: '1rem'            
        }}
    >
        {id}
    </div> 
}