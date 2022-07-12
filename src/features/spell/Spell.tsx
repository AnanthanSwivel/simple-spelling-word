import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {spellings,getSpellingDataApi,spellingsStatus} from './spellSlice';
import {AiFillEye} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Favorite from '../../component/favorite';
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton'
import ConnectionIssue from '../../component/connection-issue';

const Spell = () => {
    const spellingsData = useAppSelector(spellings);
    const status = useAppSelector(spellingsStatus);
    const dispatch = useAppDispatch();
    const [wordCount , setWordCount] = useState(spellingsData?.count ?? 0);
    const [search , setSearch] = useState('');
    const [pagePerWord , setPagePerWord] = useState(20);
    const [words , setWords] = useState(spellingsData?.results.slice(0, pagePerWord));
    const [pageCount , setPageCount] = useState(2);


    useEffect(() => {
        setWords(spellingsData?.results.slice(0, pagePerWord))
    }, [spellingsData])

    useEffect(() => {
      dispatch(getSpellingDataApi(search));
    }, [search,pagePerWord])

    useEffect(() => {
        setWordCount(spellingsData?.count)
    }, [words])

    useEffect(() => {
        setPageCount(wordCount/pagePerWord)
    }, [wordCount , pagePerWord])


    const onClickPagination = (selectedItem: { selected: number }) => {
        setWords(spellingsData?.results.slice((selectedItem.selected) * pagePerWord, (selectedItem.selected+1)*pagePerWord))
    }

    const spellingDataPrint = () => {
        if(status=== 'idle' || status==='loading') return <>{loadingPrint()}</>
        if(status=== 'failed') return <><ConnectionIssue/></>

        return <>
            <table  className="table table-striped table-inverse table-responsive ">
                <thead className="thead-inverse">
                    <tr className="text-primary">
                        <th>
                            Name
                        </th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                          wordCount > 0 ?  words.map((spell) => {
                                return <tr key={spell?.index}>
                                <td scope="row">{spell.name}</td>
                                <td>
                                    <Link to={`spell/${spell.index}`} >
                                        <AiFillEye size={25}/>
                                    </Link>
                                   <Favorite name={spell.index} />
                                </td>
                            </tr>
                            })
                            : 
                                <tr className="">
                                    <td colSpan={2}>
                                        <div className="text-center">
                                            <img className="w-75" src="https://auditivohearing.com/front_assets/img/search.png" />
                                        </div> 
                                    </td>
                                </tr>
                        }
                    </tbody>
            </table>
            <div className="row">
                <div className="d-flex justify-content-between">
                    <div>
                        <select className="form-control" onChange={(e) => setPagePerWord(parseInt(e.target.value))}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next"
                            onPageChange={onClickPagination}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </div>
                </div>
            </div>
        </>
    }

    const loadingPrint = () =>{
        return <>
            <Skeleton height={30} /> 
            <Skeleton count={20} />
        </>
    }


    
  return (
    <>
        <div className="container" >
            <div className="row my-5">
                <div className="d-flex  justify-content-between">
                    <div className="col-md-4">
                       <h4>Spelling word ({search==='' ? spellingsData?.count : wordCount  })</h4>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search word..'/>
                    </div>
                </div>
            </div>

            {spellingDataPrint()}
            
        </div>
    </>
  )
}

export default Spell