const Footer = (props) => {
    const currentDate = new Date().toDateString()
    return (
        <div>
            <hr/>
            <p style={ { textAlign: 'center' } }>{ props.message } { currentDate }</p>
        </div>
    )
}

export default Footer;