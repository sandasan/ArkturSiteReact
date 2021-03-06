import React, {useState, useEffect} from 'react'
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
// import ReactHtmlParser from 'react-html-parser'
import {Container, Row, Col} from 'react-bootstrap'

import {Gallery} from '../../Library/PhotoGallery/PhotoGallery'
import {ValidateQuery} from '../Helpers/helper'
import {getGeneralGeo, getTopTours} from '../../../Redux/actions'
import ArkturCollection from '../../Library/Images/ArkturCollection.jpg'
import './TopToursCSS.css'

export const TopToursDetails = (props) =>{

    const [ttDetails, setTTDetails] = useState()  
    let location = useLocation();
    let history = useHistory();

    let search_data = ValidateQuery(location)
    console.log('Tour Details', location)
    console.log('Seach Details', search_data)
    
    useEffect ( () => {
    axios.get(`http://smartbooker.biz/interface/content?id=${search_data.tour_id}&language=en`)
      .then( res => {
        setTTDetails(res.data)
        })
      
    .catch( error => {
        setTTDetails(undefined)
      console.log( '[axios error] : ' , error)
       });
   }, []);

   console.log('[ttDetails]', ttDetails)

    return(
        <div>
            <div style={{display:"flex", 
                         flexDirection: 'column-reverse', 
                         marginLeft: 'auto', 
                         marginRight: 'auto',
                         minWidth: '100vw'}}>
                {
                   ttDetails && ttDetails.map((item) =>{
                    
                    if(item.content_name === "Image"){
                      return (
                        <div style={{display:'flex', flexDirection:'column'}}>
                          <h2 style={{
                                color: '#102D69',
                                fontFamily: "Arial",
                                fontSize: '22px',
                                fontWeight: 'bold',
                            }}>
                                {item.contract_name}
                          </h2>
                          
                          <div>
                             <Gallery galleryImages={item.text}/>
                          </div>
                        </div>
                        )
                      }  
                      
                    else if(item.content_name === 'Body'){
                        return (
                            <div>
                                {ReactHtmlParser(item.text)}
                            </div>
                          )
                        }
                    }
                  )
                }
              </div>
             
        </div>
    )
}