import React from 'react'
import "../../styles/footer/footer.css"
import {Link} from "react-router-dom"

function Lastfooter() {
    return (
        <div className='lastfooter_div' >
            <div>©2024-25 SK Foods All Right Reserved</div>
            <div>
                Designed & developed by:  <Link to={"http://www.pitamaas.com"} target='_blank'  ><b>PITAMAAS</b></Link> 
            </div>
        </div>
    )
}

export default Lastfooter