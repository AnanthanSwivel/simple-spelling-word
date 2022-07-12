import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {getSpellingDetailsApi , spelling,spellingStatus} from './spellDetailsSlice';
import { Link, useParams, useNavigate  } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi'
import Favorite from '../../component/favorite';
import Skeleton from 'react-loading-skeleton';
import ConnectionIssue from '../../component/connection-issue';
const SpellDetails = () => {
    const dispatch = useAppDispatch();
    const wordDetails = useAppSelector(spelling);
    const status = useAppSelector(spellingStatus);
    let {name} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        name && dispatch(getSpellingDetailsApi(name));
    }, [name])

    const wordPrint = () => {
        return <>
            <div className="card my-5">
              <div className="card-header d-flex justify-content-between">
                <div>
                    <h3 className="card-title"><a onClick={() => navigate(-1)}><BiArrowBack /> </a>{wordDetails?.name}</h3>
                    <h6 className="card-subtitle text-muted ps-5">{wordDetails?.material}</h6>
                </div>
                <div>
                    <Favorite name={wordDetails?.index} />
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">{wordDetails?.desc}</p>
                <hr/>
                <div>
                    <strong>High Level Description : </strong>
                    <h6 className="card-subtitle text-muted">{wordDetails?.higher_level}</h6>
                </div>
                {
                   wordDetails?.classes && wordDetails.classes.length > 0 && 
                    <div className="my-2">
                        <strong >Classes : </strong>
                        {wordDetails?.classes.map((val) => {
                            return <>{val.name}</>
                            }
                        )}
                    </div>
                }
                {
                   wordDetails?.subclasses && wordDetails.subclasses.length > 0 && 
                        <div className="my-2">
                            <strong >Sub Classes : </strong>
                                {wordDetails?.subclasses.map((val) => {
                                    return <>{val.name}</>
                                    }
                                )}
                        </div>
                }
              </div>
            </div>
        
        </>
    }

    const print404 = () => {
        return <>
        <div className='position-absolute top-50 start-50 translate-middle'>
            <img className=' ' src="https://bsmedia.business-standard.com/_media/bs/img/about-page/thumb/464_464/1599716993.jpg"/>
            <div className='d-flex justify-content-center my-3'>
                <Link to={'/'} className='btn btn-primary'>Back To Home</Link>
            </div> 
        </div>
        </>
    }

    const printData = () => {
        if(status=== 'idle' || status==='loading') return <>{loadingPrint()}</>
        if(status=== 'failed') return <><ConnectionIssue/></>
        if(status=== 'success' && wordDetails?._id ==='') return  <>{print404()}</>
        return  <>{wordPrint()}</>
    }

    const loadingPrint = () =>{
        return <>
            <div className="my-5">
                <Skeleton height={50} /> 
                <Skeleton count={5} />
            </div>
        </>
    }

    
  return (
    <>
        <div className="container">
            {
               printData()
            }
        </div>
    </>
  )
}

export default SpellDetails