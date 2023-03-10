import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { allBooks, deleteBook, clearErrors } from '../../actions/bookActions'
import { DELETE_BOOK_RESET } from '../../constants/bookConstants'

const BookManagement = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, books } = useSelector(state => state.allBooks);
    const { isDeleted } = useSelector(state => state.book)

    const subjectArr = books.bookSubjects

    const [subjects, setSubjects] = useState([]);

    const [yearPubStart, setyearPubStart] = useState(books.lowestYearPub);
    const [yearPubEnd, setyearPubEnd] = useState(books.highestYearPub);

    const [new_yearValue, setnew_yearValue] = useState([yearPubStart, yearPubEnd]);
    const [subjectFilter, setSubjectFilter] = useState('');

    // console.log( yearPubStart, yearPubEnd)

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allBooks())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Book deleted successfully');
            navigate('/admin/books');
            dispatch({ type: DELETE_BOOK_RESET })
        }

    }, [dispatch, alert, error, navigate, new_yearValue, subjectFilter, isDeleted])

    const handleCheckedChanged = (sub) => {
        const isChecked = subjects.includes(sub);

        if (!isChecked) {
            setSubjects([...subjects, sub]);
        } else {
            const updatedSubjects = [...subjects].filter(s => s !== sub);
            setSubjects(updatedSubjects);
        }
    }

    const filterSubjects = () => {
        console.log(subjects, yearPubStart, yearPubEnd)
        console.log(subjects, books.lowestYearPub, books.highestYearPub)

        const formData = new FormData();
        if (yearPubStart != undefined) {
            formData.set('minYear', yearPubStart)
        } else {
            formData.set('minYear', books.lowestYearPub)
        }

        if (yearPubEnd != undefined) {
            formData.set('maxYear', yearPubEnd)
        } else {
            formData.set('maxYear', books.highestYearPub)
        }
        subjects.forEach(subject =>
            formData.append('subjects', subject)
        )
        dispatch(allBooks(formData))
    }

    const filterYearPub = (e) => {
        const formData = new FormData();
        formData.set('minYear', yearPubStart)
        formData.set('maxYear', yearPubEnd)
        subjects.forEach(subject =>
            formData.append('subjects', subject)
        )
        dispatch(allBooks(formData))
        // dispatch(allBooks(new_yearValue));
    };

    const clearYearPub = (e) => {
        setyearPubStart(books.lowestYearPub)
        setyearPubEnd(books.highestYearPub)


        setnew_yearValue([yearPubStart, yearPubEnd])
    };

    const deleteBookHandler = (id) => {
        dispatch(deleteBook(id))
    }

    const col = [
        {
            title: 'Call Number',
            field: 'call_number',
            searchable: false,
            render: rowData => (
                (rowData.Fil === true) ? <div><p>{"FIL " + rowData.call_number}</p></div> :
                    (rowData.Ref === true) ? <div><p>{"REF " + rowData.call_number}</p></div> :
                        (rowData.Bio === true) ? <div><p>{"BIO " + rowData.call_number}</p></div> :
                            (rowData.Res === true) ? <div><p>{"RES " + rowData.call_number}</p></div> :
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
                            <Link to={`/admin/single/book/${rowData._id}`}>{rowData.title} </Link>
                        }

                    </div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
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
            title: 'Year',
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
                        <div>{rowData.subjects.map((item) => (
                            // <Link to={`/book/category/${item}`}>{item} </Link>
                            <p>{item}</p>
                        ))}</div>
                    </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Stock',
            field: 'copy',
            searchable: false,
            width: '50',
            emptyValue: () => <em>null</em>,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'In',
            field: 'on_shelf',
            searchable: false,
            width: '50',
            emptyValue: () => <em>null</em>,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Out',
            field: 'out',
            searchable: false,
            width: '50',
            emptyValue: () => <em>null</em>,
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Accession Number(s)',
            field: '_id',
            searchable: false,
            render: rowData => (
                <Fragment>
                    <div className="icon-buttons">
                        <Link to={`/accession/detail/${rowData._id}`} className="btn btn-primary py-1 px-2">
                            <i class="fa-regular fa-eye"></i>
                        </Link>
                    </div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
            headerStyle: {
                textAlign: 'center'
            }
        },
        {
            title: 'Actions',
            field: '_id',
            render: rowData => (
                <Fragment>
                    <div className="icon-buttons">
                        <Tooltip className="" title="Edit">
                            <Link to={`/admin/book/${rowData._id}`} className="btn btn-warning py-1 px-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                        </Tooltip>

                        <Tooltip className="" title="Delete">
                            <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target={"#DeleteBookModal" + rowData._id}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Tooltip>
                    </div>

                    <div className="modal fade" data-backdrop="false" id={"DeleteBookModal" + rowData._id} tabindex="-1" role="dialog" aria-labelledby="DeleteActiveModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title" id="DeleteActiveModalLabel">Delete User</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this book?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => deleteBookHandler(rowData._id)} data-dismiss="modal">Delete</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ),
            searchable: false,
            headerStyle: {
                textAlign: 'center'
            }
        },


    ]

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            <div className='col-12'>
                {loading || loading === undefined ? <Loader /> : (
                    <div className="dashboard-container">
                        <div className='table-container'>
                            <div className='book-align'>

                                <div className='book-add'>
                                    <h1 className='m-0'>
                                        Add Book
                                        <Link to={"/book/new"}><i className="fa-solid fa-circle-plus"></i></Link>

                                    </h1>
                                </div>
                                <div className='row'>
                                    <div className='col-3 year-published'>
                                        <h4 className='text-center'>Year Published</h4>
                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <TextField id="yearStart" label="Start Year" defaultValue={books.lowestYearPub} value={yearPubStart} onChange={(e) => setyearPubStart(e.target.value)} variant="outlined" style={{ display: 'block', margin: '0 auto', marginRight: '10px', width: '80px' }} />

                                            <span style={{ paddingTop: '1em' }}>&#8212;</span>

                                            <TextField id="yearEnd" label="End  Year" defaultValue={books.highestYearPub} value={yearPubEnd} onChange={(e) => setyearPubEnd(e.target.value)} variant="outlined" style={{ display: 'block', margin: '0 auto', marginLeft: '10px', width: '80px' }} />
                                        </div>

                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <button type="button" className="btn btn-primary" onClick={filterYearPub} style={{ display: 'block', margin: '0 auto', marginRight: '5px' }}>Filter  <i class="fa-solid fa-filter"></i></button>

                                            <button type="button" className="btn btn-danger" onClick={clearYearPub} style={{ display: 'block', margin: '0 auto', marginLeft: '5px' }}>Clear  <i class="fa-solid fa-filter-circle-xmark"></i></button>
                                        </div>
                                    </div>

                                    <div className='col-9 filter-subject'>
                                        <div className='row'>
                                            <div className='col'>
                                                <h4 className='text-center'>Filter by Subject</h4>
                                            </div>
                                            <div className='col'>
                                                <div className='row' style={{ marginBottom: 10 }}>
                                                    <button type="button" className="btn btn-primary" onClick={filterSubjects}>Filter  <i class="fa-solid fa-filter"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>

                                            {books.bookSubjects && books.bookSubjects.length > 0 ? (

                                                subjectArr.map((subject, index) => (
                                                    <div className="col-sm-3" key={index}>
                                                        <input type="checkbox" id="checkbox" name="checkbox" value={subject} checked={subjects.includes(subject)} onChange={() => handleCheckedChanged(subject)} /> {subject}
                                                    </div>
                                                ))

                                            ) : (
                                                <li>Subject not Found</li>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {loading ? <Loader /> : (
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <MaterialTable
                                        title='Books List'
                                        data={books.book}
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
                )}
            </div>
        </Fragment>
    )
}
export default BookManagement