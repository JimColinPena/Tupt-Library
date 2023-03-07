import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import DeactivatedUser from './DeactivatedUser'
import SideNavbarUser from '../layout/SideNavbarUser'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allStudentBooks, clearErrors } from '../../actions/studentActions'

const BookSearch = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, studentbooks } = useSelector(state => state.allStudentBooks);
    const { user } = useSelector(state => state.auth)
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const newYearStart = studentbooks.lowestYearPub;
    // const newYearEnd = studentbooks.highestYearPub;

    // console.log(newYearStart)
    // console.log(newYearEnd)

    const subjectArr = studentbooks.bookSubjects

    const [yearPubStart, setyearPubStart] = useState(0);
    const [yearPubEnd, setyearPubEnd] = useState(3000);
    const [new_yearValue, setnew_yearValue] = useState([yearPubStart, yearPubEnd]);
    const [subjectFilter, setSubjectFilter] = useState('');

    console.log(yearPubStart)
    console.log(yearPubEnd)

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allStudentBooks(new_yearValue, subjectFilter));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, new_yearValue, subjectFilter, alert, error, navigate])

    const filterYearPub = (e) => {
        setyearPubStart(yearPubStart)
        setyearPubEnd(yearPubEnd)

        setnew_yearValue([yearPubStart, yearPubEnd])
        console.log(new_yearValue)
    };

    const clearYearPub = (e) => {
        setyearPubStart(studentbooks.lowestYearPub)
        setyearPubEnd(studentbooks.highestYearPub)

        setnew_yearValue([yearPubStart, yearPubEnd])
        setSubjectFilter('')
        console.log(new_yearValue)
    };

    const col = [
        {
            title: 'Call Number',
            field: 'call_number',
            searchable: false,
            render: rowData => (
                (rowData.Fil == true) ? <div><p>{"FIL " + rowData.call_number}</p></div> :
                    (rowData.Ref == true) ? <div><p>{"REF " + rowData.call_number}</p></div> :
                        (rowData.Bio == true) ? <div><p>{"BIO " + rowData.call_number}</p></div> :
                            (rowData.Res == true) ? <div><p>{"RES " + rowData.call_number}</p></div> :
                                <div><p>{"N/A " + rowData.call_number}</p></div>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Book Title',
            field: 'title',
            render: rowData => (
                <Fragment>
                    <div>
                        {
                            <Link to={`/book/${rowData._id}`}>{rowData.title} </Link>
                        }

                    </div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
                width: "500px"
            },
        },
        {
            title: 'Author',
            field: 'main_author',
            render: rowData => (
                <Fragment>
                    <div><p>{rowData.main_author}</p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },

        },
        {
            title: 'Year Pub',
            field: 'yearPub',
            emptyValue: () => <em>null</em>,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Subject(s)',
            field: 'subjects',
            // emptyValue:()=><em>null</em>,
            render: rowData => (
                (rowData.subjects === null || rowData.subjects === undefined) ? <em>null</em> :
                    <Fragment>
                        <div>{rowData.subjects.map((item) => (<p>{item}</p>))}</div>
                    </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
                
            },
        },
    ]

    return (
        <Fragment>
            <MetaData title={'Books'} />
            <SideNavbarUser />
            {loading || loading === undefined ? <Loader /> : (
                <Fragment>
                    <div className="management-content">
                        {(user.course === undefined | null) ?
                            <DeactivatedUser />
                            : <div>
                                <h1>Books <span></span>
                                </h1>
                                <hr />
                                <div className="management-body">
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <h4 className='text-center'>Year Published</h4>
                                            <div className='row' style={{ marginBottom: 10 }}>
                                                <TextField id="yearStart" label="Start Year" defaultValue={studentbooks.lowestYearPub} value={yearPubStart} onChange={(e) => setyearPubStart(e.target.value)} variant="outlined" style={{ display: 'block', margin: '0 auto', marginRight: '10px', width: '80px'  }} />

                                                <span style={{ paddingTop: '1em' }}>&#8212;</span>

                                                <TextField id="yearEnd" label="End Year" defaultValue={studentbooks.highestYearPub} value={yearPubEnd} onChange={(e) => setyearPubEnd(e.target.value)} variant="outlined" style={{ display: 'block', margin: '0 auto', marginLeft: '10px', width: '80px' }} />
                                            </div>

                                            <div className='row' style={{ marginBottom: 10 }}>
                                                <button type="button" className="btn btn-primary " onClick={filterYearPub} style={{ display: 'block', margin: '0 auto', marginRight: '5px' }}>Filter  <i class="fa-solid fa-filter"></i></button>

                                                <button type="button" className="btn btn-danger " onClick={clearYearPub} style={{ display: 'block', margin: '0 auto', marginLeft: '5px' }}>Clear  <i class="fa-solid fa-filter-circle-xmark"></i></button>
                                            </div>
                                        </div>
                                        <div className='col-md-9'>
                                            <h4 className='text-center'>Filter by Subject</h4>
                                            <div className='row'>
                                                {studentbooks.bookSubjects && studentbooks.bookSubjects.length > 0 ? (

                                                    subjectArr.map((subject) => {
                                                        return (
                                                            <div className='col-sm-2' key={subject}>
                                                                {/* <input type="checkbox" id={subject} name={subject} value={subject} onChange={() => setSubjectFilter([...subjectFilter, subject])}/> {subject} */}
                                                                {/* {console.log(subjectFilter)} */}

                                                                <button style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline' }} id={subject} name={subject} value={subject} onClick={() => setSubjectFilter(subject)}> {subject} </button>
                                                                {/* {console.log(subjectFilter)} */}
                                                            </div>
                                                        )
                                                    })

                                                ) : (
                                                    <li>Subject not Found</li>
                                                )}
                                            </div>
                                        </div>

                                    </div>



                                    {loading || loading === undefined ? <Loader /> : (
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <MaterialTable
                                                title='Books List'
                                                data={studentbooks.studentbook}
                                                columns={col}
                                                localization={
                                                    {
                                                        toolbar: {
                                                            searchPlaceholder: 'Book,Year,Author,Subject...'
                                                        }
                                                    }
                                                }
                                                options={{
                                                    pageSize: 10,
                                                    headerStyle: {
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        backgroundColor: '#BA0202',
                                                        color: '#ffffff',
                                                    },
                                                    rowStyle: {
                                                        fontSize: 15,
                                                        backgroundColor: '#F9F5F5',
                                                    },
                                                    emptyRowsWhenPaging: false
                                                }}
                                            />
                                        </ThemeProvider>
                                    )}
                                </div>
                            </div>
                        }


                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default BookSearch