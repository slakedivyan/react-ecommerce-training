const Header = function(props) {
    return (
        <div style={ { paddingTop: '10px' } }>
            <div><h2 style={ props.style }>{ props.children }</h2></div>
            <hr/>
        </div>
    )
}

// Usually we will use this default keyword only when 
// we have "1 export" for "1 file"
export default Header;