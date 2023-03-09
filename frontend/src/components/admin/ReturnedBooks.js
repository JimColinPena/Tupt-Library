import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from "react-router-dom";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import SideNavbarAdmin from '../layout/SideNavbarAdmin'
import dateFormat from 'dateformat';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { RETURN_BOOK_RESET } from '../../constants/personnelConstants'

import { allBorrowed, returnBook, allReturned, clearErrors } from '../../actions/personnelActions'

const ReturnedBooks = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, borrowedbooks } = useSelector(state => state.allBorrowed);
    const { returnedbooks } = useSelector(state => state.allReturnedState);
    const { isReturned } = useSelector(state => state.returnBook)

    const defaultMaterialTheme = createTheme({});

    useEffect(() => {
        dispatch(allBorrowed());
        dispatch(allReturned());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isReturned) {
            alert.success('Book returned');
            navigate('/books/borrowed');
            dispatch({ type: RETURN_BOOK_RESET })
        }

    }, [dispatch, alert, error, navigate, isReturned])

    const returnedHandler = (id) => {
        dispatch(returnBook(id))
    }

    const col = [
        {
            title: 'TUPT-ID',
            field: 'userId.id_number',
            render: rowData => (
                <Fragment>
                    <div><p>{rowData.userId.id_number}</p></div>
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
            title: 'Name',
            field: 'userId.name',
            render: rowData => (
                <Fragment>
                    <div><p><Link to={`/detail/student/${rowData.userId._id}`}>{rowData.userId.name} </Link></p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'E-mail',
            field: 'returnedbooks_email',
            searchable: false,
            render: rowData => (
                <Fragment>
                    <div><p>{rowData.userId.email}</p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Contact',
            field: 'returnedbooks_contact',
            width: '5%',
            searchable: false,
            render: rowData => (
                <Fragment>
                    <div><p>{rowData.userId.contact}</p></div>
                </Fragment>
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Book',
            field: '[returnedbooks.bookId.title]',
            render: rowData => (
                rowData.bookId.map((item, index) => (
                    <Fragment>
                        <div><p><Link to={`/admin/single/book/${item._id}`}>{item.title} </Link></p></div>
                    </Fragment>
                ))
            ),
            cellStyle: {
                textAlign: "left",
            },
        },
        {
            title: 'Due Date',
            field: 'returnedDate',
            searchable: false,
            render: rowData => (
                <Fragment>
                    <div><p>{dateFormat(rowData.returnedDate.split('T')[0], "mmmm dd, yyyy")}</p></div>
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
            title: 'Returned To',
            field: 'returnedTo.name',
            searchable: false,
            cellStyle: {
                textAlign: "left",
            },
            headerStyle: {
                textAlign: 'center'
            }
        },
    ]

    return (
        <Fragment>
            <MetaData title={'TUP-T Online Library - Admin'} />
            <SideNavbarAdmin />
            {loading ? <Loader /> : (
                <div className="dashboard-container">
                    <div className="table-container">
                        <div className="col-12">
                            {loading ? <Loader /> : (
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <MaterialTable
                                        title='Returned Books List'
                                        data={returnedbooks}
                                        columns={col}
                                        localization={
                                            {
                                                toolbar: {
                                                    searchPlaceholder: 'ID, Name...'
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
                </div>
            )}
        </Fragment>
    )
}
export default ReturnedBooks